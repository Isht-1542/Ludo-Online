import { useEffect, useState } from "react"
import Board from "./Board"
import { useDispatch, useSelector } from "react-redux";
import { addColor, addUserToColor, changeMoveDone, changeisActive } from "../reducer/Gameslice";
import useBoard from "../hooks/useBoard";
import Player from "./Player";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import bgboard from "../assets/bgboard.png"
import plmove from "../assets/music/plmove.mp3"
import myturn from "../assets/music/myturn.mp3"
import oppturn from "../assets/music/oppturn.mp3"
import gameOver from "../assets/music/gameOver.mp3";

const Game = ({socket, roomId}) => {

    var inBoard = {"blue":[81,82,83,84],"red":[85,86,87,88],"green":[89,90,91,92],"yellow":[93,94,95,96]};

    const [diceActive, setdiceActive] = useState(false);
    const [diceVal, setdiceVal] = useState(0);
    const { board, setValue } = useBoard(null);
    const [PlayGameModal, setPlayGameModal] = useState(null);
    const {color, user, nextPos, blue, red, green, yellow, safe, isMoveDone, isActive,} = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let oppmu = new Audio(oppturn);
    let pl_move = new Audio(plmove);
    let gameOverA = new Audio(gameOver);

    var homeArr = [];
    var startpt = 0;
    if(color==="blue") {homeArr = blue; startpt=20}
    else if(color==="red") {homeArr = red; startpt=6}
    else if(color==="green") {homeArr = green; startpt=67}
    else {homeArr = yellow; startpt=53}


    //informs server that the move is done
    function tellSocketMoveDone() {
        console.log("movedone");
        setdiceActive(false);
        dispatch(changeMoveDone(true));
        dispatch(changeisActive(false));
        setTimeout(() => {
            oppmu.play();
            socket.emit("turn", {});
        }, 1000)
    }

    const possibleMoveCheck = (number) => {
        let pieces = board[color];
        let notPossible = 0;
        let id = 101;
        for(let piece in pieces){
            if (!nextSquareId(pieces[piece], number)) notPossible++;
            else id = pieces[piece];
        }
        if(notPossible===3){
            console.log("notPossibe:",1);
            movePiece(id, number);
        }
        if(notPossible===4 && number!==6){
            console.log("notpos");
            tellSocketMoveDone();
        }
        if(number===6 && notPossible===4){
            setdiceActive(true);
            dispatch(changeMoveDone(true));
        }
    }

    const nextSquareId = (n, count) => {
        if(count===0) return n;
        if(count===6 && inBoard[color].includes(n)){
            if(inBoard[color].includes(n)) return startpt;
            else return false;
        }
        if(inBoard[color].includes(n)) return false;

        if(homeArr.includes(n)){
            let pos = homeArr.findIndex((x) => x===n);
            if(pos+count <= 6 ) return homeArr[pos+count];
            else return false;
        }
        let start = nextPos.findIndex((x) => x===n);
        while(count>=1){
            if(homeArr.includes(n)){
                let pos = homeArr.findIndex((x) => x===n);
                if(pos+count <= 6 ) return homeArr[pos+count];
                else return false;
            }
            start++;
            if(start===52) start = 0;
            n = nextPos[start];
            count--;
        }
        return n;
    }
    
    

    const movePiece = (id, number) => {
        console.log("movepiece:en:",id);
        let isHit = false;
        let moveNum = number!==null ? (number):diceVal;
        console.log("moveNum:",moveNum);
        let newId = nextSquareId(id, moveNum);
        if(!newId) {
            newId=id;
            return;
        }
        
        pl_move.play();
        console.log(newId);
        console.log(moveNum);

        const tempboard = {...board};
        console.log(board);
        console.log(tempboard);
        if(newId!==100 && !safe.includes(newId)){
            for(let c of Object.keys(board)){
                if(c!==color && board[c].includes(newId)){
                    let ind = board[c].findIndex((x) => x===newId);
                    tempboard[c][ind] = inBoard[c][ind];
                    isHit = true;
                    console.log("hit");
                }
            }
        }
        console.log("hi");
 
        let ind = board[color].indexOf(id);

        tempboard[color][ind] = newId;
        setValue(tempboard);
        console.log("changed");
        console.log(board);
        dispatch(changeMoveDone(true));

        if(moveNum===6 || isHit || newId===100){
            setdiceActive(true);
            dispatch(changeMoveDone(true));
        }
        else{
            tellSocketMoveDone();
        }

        if(JSON.stringify(board[color]) === JSON.stringify([100,100,100,100])){
            // tellSocketMoveDone();
            socket.emit('home',{});
        }
        console.log("nearboard");
        console.log(board);
        socket.emit("board", board);
    }

    useEffect(() => {
        //allows the player to play his turn
        socket.on('firstTurn', (plColor, roomId) => {
            let my_turn = new Audio(myturn);
            my_turn.play();
            setdiceActive(true);
            dispatch(changeMoveDone(false));
            dispatch(changeisActive(true));
            console.log("first turn", color);
            console.log(plColor);
        });

        socket.on("turn", () => {
            let my_turn = new Audio(myturn);
            my_turn.play();
            setdiceActive(true);
            dispatch(changeMoveDone(true));
            dispatch(changeisActive(true));
        });
        
        socket.on("board", (newboard) => {
            console.log("boardfront");
            setValue(newboard);
            pl_move.play();
            console.log(board);
        });
        
    }, [])

    socket.on("gameFinish", () => {
        console.log("game finished");
        setPlayGameModal(true);
        setTimeout(() => {
            gameOverA.play();
        }, 1000);
    })
    
    useEffect(() => {
        socket.on('colorTOuser', (ctou) => {
            console.log("Ga6:", ctou);
            dispatch(addUserToColor(ctou));
        });
    },[])

    socket.on('color', (color) => {
        console.log("Ga5:", color);
        dispatch(addColor(color));
    })

    socket.on('newGame', () => {
        console.log("NEWGAME");
        navigate(`/waitingRoom/${roomId}`);
    })

    const newGame = () => {
        socket.emit('restart', {});
    }

    return (
        <div className="relative h-full w-full flex flex-col md:flex-row">
            <div className="h-screen w-full md:w-9/12 flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${bgboard})`}}>
                <div className="h-[5%] md:h-2/12 w-full text-white flex justify-center">
                    {!PlayGameModal && <div></div>}
                    {PlayGameModal && color==="blue" &&
                    <div className="flex gap-2 items-center justify-center bg-gray-900 rounded-md mx-auto mb-1">
                        <p className="text-base text-cyan-500">Game Over!</p>
                        <p className="text-base">Do you want to play a New Game ?</p>
                        <button onClick={newGame} className="text-center h-4/6 text-base w-[6rem] px-2 py-3 rounded-md font-semibold
                    bg-yellow-600 text-white hover:scale-95 transition-all duration-200 flex items-center justify-center">Yes</button>
                    </div>
                    }
                </div>
                <div className="mb-3 h-[75%] md:h-5/6 w-11/12 md:flex-row flex flex-col">
                    <div className="w-full md:w-2/12 h-[10%] md:h-full flex md:flex-col justify-between">
                        <Player co="blue" socket={socket} setdiceVal={setdiceVal} setdiceActive={setdiceActive} diceActive={diceActive} possibleMoveCheck={possibleMoveCheck}/>
                        <Player co="green" socket={socket} setdiceVal={setdiceVal} setdiceActive={setdiceActive} diceActive={diceActive} possibleMoveCheck={possibleMoveCheck}/>
                    </div>
                    <div className="w-full md:w-8/12 h-[74%] md:h-full flex items-center">
                        <Board socket={socket} movePiece={movePiece} isMoveDone={isMoveDone} board={board}/>
                    </div>
                    <div className="w-full md:w-2/12 h-[10%] md:h-full flex md:flex-col justify-between">
                        <Player co="red" socket={socket} setdiceVal={setdiceVal} setdiceActive={setdiceActive} diceActive={diceActive} possibleMoveCheck={possibleMoveCheck}/>
                        <Player co="yellow" socket={socket} setdiceVal={setdiceVal} setdiceActive={setdiceActive} diceActive={diceActive} possibleMoveCheck={possibleMoveCheck}/>
                    </div>
                </div>
                <div className="h-[15%] md:h-[0%]"></div>
            </div>
            <div className="top-[80%] left-[30%] md:h-screen md:left-0 md:top-0 absolute md:relative w-4/6 md:w-3/12">
                <Chat socket={socket}/>
            </div>
        </div>
    )
}

export default Game
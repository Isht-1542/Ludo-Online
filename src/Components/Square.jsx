import { useEffect, useState } from "react";
import Piece from "./Piece"
import winner1 from "../assets/winner1.png";
import winner2 from "../assets/winner2.png";
import winner3 from "../assets/winner3.png";
import plwin from "../assets/music/plwin.mp3";


const Square = ({board, colorInd, movePiece, isMoveDone, winColor, winNo}) => {

    const [winnerNo, setwinnerNo] = useState(null);
    var colorArray = ["blue","red","green","yellow"];
    var winnerArray = [winner1, winner2, winner3];

    let pieceColor = colorArray[colorInd];

    var arr = board[pieceColor];
    var inBoard = {"blue":[81,82,83,84],"red":[85,86,87,88],"green":[89,90,91,92],"yellow":[93,94,95,96]};


    useEffect(() => {
        function checkWin(){
            if(winColor.includes(pieceColor)){
                let ind = winColor.findIndex((x) => x===pieceColor);
                console.log(ind);
                setwinnerNo(winNo[ind]-1);
                var winAudio = new Audio(plwin);
                winAudio.play();
            }
        }
        checkWin();
    }, [winColor])

    return (
        <div className={`h-full relative bg-${pieceColor}-500 flex justify-center items-center rounded-md border border-black`}>
            {<div className="h-4/6 w-4/6 grid grid-cols-2 place-items-center rounded-md bg-white border-[1.5px] border-black">
                {winnerNo===null && arr.map((item, index) => (
                    <div key={index} className={`relative h-7 w-7 md:h-9 md:w-9 rounded-md shadow-xl shadow-gray-400 bg-gray-200 border-[1.5px] border-black`}> 
                        {inBoard[pieceColor].includes(item) ? (<Piece colorInd={colorInd} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>):(<div/>)}
                    </div>
                ))}
            </div>
            }
            {winnerNo!==null && 
            <div className="absolute h-5/6 w-5/6">
                <img src={winnerArray[winnerNo]} alt="winnerpic"></img>
            </div>
            }
        </div>

    )
}

export default Square
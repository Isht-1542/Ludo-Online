import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlayGame from "./Modals/PlayGame";
import bgImg from "../assets/bgwait.png";
import userblue from "../assets/blue.png"
import userred from "../assets/red.png"
import usergreen from "../assets/green.png"
import useryellow from "../assets/yellow.png"
import bgblue from "../assets/bgblue.jpg"
import bgred from "../assets/bgred.jpg"
import bggreen from "../assets/bggreen.jpg"
import bgyellow from "../assets/bgyellow.jpg"
import waudio from "../assets/music/waitingRoomAudio.mp3"

const WaitingRoom = ({socket, roomId}) => {

    const [Players, setPlayers] = useState([]);
    const [PlayGameModal, setPlayGameModal] = useState(null);
    const {user} = useSelector((state) => state.game);
    const navigate = useNavigate();

    let song = new Audio(waudio);
    var bgImgUrls = [bgblue, bgred, bggreen, bgyellow];
    
    useEffect(() => {
        socket.emit('waitingRoom',{});
        
        socket.on('names', (names) => {
            console.log("players:", names);
            setPlayers(names);
        })

        
        song.loop = true;
        song.play();
    },[])

    useEffect(() => {
        return () => {
            song.pause();
        }
    }, [])

    socket.on('gameBegin', () => {
        song.pause();
        navigate(`/game/${roomId}`);
    })

    const StartGame = () => {
        song.pause();
        navigate(`/game/${roomId}`);
        if(user.userName === Players[0]) socket.emit('GameStarted', roomId);
        console.log("C6");
    }

    return (
        <>
        <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})`}} >
            <div className="h-full md:w-1/2 flex items-center justify-center">
                <div className="h-5/6 w-4/6 flex flex-col bg-yellow-40 items-center justify-center gap-6">
                    <div className="h-1/6 w-full md:text-lg text-sm text-cyan-500 flex items-center justify-center">
                        Waiting for {Players[0]} to start the game....
                    </div>
                    <div className="h-3/6 md:h-4/6 w-11/12 rounded-lg flex flex-col items-center justify-center gap-11 md:gap-4">
                        {Players.map((username, index) => (
                            <div key={index} className="h-1/5 w-5/6 rounded-lg text-white bg-black flex items-center gap-2 md:gap-4 
                            bg-cover bg-right" style={{ backgroundImage: `url(${bgImgUrls[index]})`}}>
                                {index===0 && <img src={userblue} alt="user" className="w-7 h-7 md:w-11 md:h-11 rounded-full ml-1"/>}
                                {index===1 && <img src={userred} alt="user" className="w-7 h-7 md:w-11 md:h-11 rounded-full ml-1"/>}
                                {index===2 && <img src={usergreen} alt="user" className="w-7 h-7 md:w-11 md:h-11 rounded-full ml-1"/>}
                                {index===3 && <img src={useryellow} alt="user" className="w-7 h-7 md:w-11 md:h-11 rounded-full ml-1"/>}
                                <p className="text-white text-xl">{username}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex h-1/6 items-center justify-center">
                        {user.userName === Players[0] && <button 
                            onClick={() =>
                                setPlayGameModal({
                                text1: "Are you sure ?",
                                text2: "No one will be allowed to enter the game afterwards.",
                                btn1Text: "Start Game",
                                btn2Text: "Cancel",
                                btn1Handler: StartGame,
                                btn2Handler: () => setPlayGameModal(null),
                                })
                            }
                            className='text-center text-[20px] w-[9rem] px-2 py-3 rounded-lg font-semibold
                            bg-yellow-600 text-white hover:scale-95 transition-all duration-200'>Play Game</button>
                        }
                    </div>
                </div>
            </div>
        </div>
        {PlayGameModal && <PlayGame modalData={PlayGameModal} />}
        </>
    )
}

export default WaitingRoom
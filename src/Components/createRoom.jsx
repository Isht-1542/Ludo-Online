import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgmain.png"
import mainAudio from "../assets/music/mainAudio.mp3";
import Dicefront from "./Dicefront";

const CreateRoom = ({socket, roomId}) => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.game);
    const [copyBtnValue,setCopyBtnValue] = useState('Copy');
    const [copied, setCopied] = useState(false);

    let song = new Audio(mainAudio);
    
    useEffect(() => { 
        song.loop = true;
        song.play();
    },[])

    useEffect(() => {
        return () => {
            song.pause();
        }
    }, [])


    useEffect(()=>{
        console.log(user);
        if(!user){
            navigate("/");  
        }
    },[])


    useEffect(() => {
        console.log("C1");
        socket.emit('joinRoom',{username:user.userName, userId:user.userId, roomId:roomId})
    },[])

    useEffect(() => { 
        console.log("C2");
        socket.on('message', (payload)=>{
            console.log(payload)
        })
    },[])

    const copytext =  function copyText(){
        navigator.clipboard.writeText(roomId)
        .then(() => {
            setCopied(true);
            setCopyBtnValue('Copied');
            setTimeout(() => {
                setCopyBtnValue('Copy');
                setCopied(false);
            }, 3000);
            console.log("C4");
        })
        .catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    return (
        <>
        <div className="h-screen w-full relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="dices relative flex">
                <span className="span" style={{"--i":5}}></span>
                <span style={{"--i":12}}></span>
                <span className="span1" style={{"--i":24}}><Dicefront nu={0}/></span>
                <span style={{"--i":10}}></span>
                <span style={{"--i":14}}></span>
                <span className="span1" style={{"--i":16}}><Dicefront nu={1}/></span>
                <span style={{"--i":18}}></span>
                <span style={{"--i":26}}></span>
                <span style={{"--i":19}}></span>
                <span style={{"--i":8}}></span>
                <span style={{"--i":22}}></span>
                <span style={{"--i":25}}></span>
                <span style={{"--i":18}}></span>
                <span style={{"--i":21}}></span>
                <span style={{"--i":2}}></span>
                <span className="span1" style={{"--i":15}}><Dicefront nu={2}/></span>
                <span style={{"--i":26}}></span>
                <span style={{"--i":17}}></span>
                <span className="span1" style={{"--i":8}}><Dicefront nu={3}/></span>
                <span style={{"--i":28}}></span>
            </div>
            <div className=' overflow-y-hidden relative flex w-full mx-auto h-5/6 max-w-maxContent flex-col 
                items-center justify-center gap-y-11'>
                <h1 className='font-bold text-yellow-100 font-edu-sa text-5xl md:text-6xl translate-y-[-1rem]'>Invite Friend</h1>
                <div className='gap-x-2 w-50 h-15 relative flex justify-between'>
                    <input disabled={true} value={roomId} type="text" className=' w-[12rem] md:w-[15rem] text-white text-lg 
                    rounded-md bg-yellow-800 text-[20px] px-5 py-2'/>
                    <button onClick={copytext} className='text-center text-[20px] w-[7rem] md:w-[9rem] px-2 py-3 rounded-md font-semibold
                    bg-yellow-500 text-white hover:scale-95 transition-all duration-200'>{copyBtnValue}</button>
                </div>
                <div>
                    <button 
                        onClick={() => {
                            navigate(`/waitingRoom/${roomId}`);
                        }}
                    className='text-center relative text-[20px] w-[8rem] md:w-[9rem] px-2 py-3 rounded-md font-semibold
                    bg-yellow-500 text-white hover:scale-95 transition-all duration-200'>Play Game</button>
                </div> 
            </div>
        </div>
        </>
    )
}

export default CreateRoom
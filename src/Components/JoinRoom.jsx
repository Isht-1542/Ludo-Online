import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/bgmain.png"
import mainAudio from "../assets/music/mainAudio.mp3";
import Dicefront from "./Dicefront";

const JoinRoom = ({socket}) => {

    const navigate = useNavigate();
    const {user} = useSelector((state) => state.game);
    const [joined, setJoined] = useState(false);
    const [roomId, setRoomId] = useState('')
    const [error, setError]  = useState('');

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

    useEffect(() => {
        if(!user){
            navigate("/");
        }
          
        socket.on('message',(payload)=>{
          console.log("j2");
          console.log(payload);
            if(payload.error){
                setError(payload.error);
                setTimeout(()=>{
                    setError('');
                },4000)
                console.log("j3");
            }
            else{
              setJoined(true);
              console.log("j4");
            }
        })
        console.log(joined);
    },[])

    function handleClick(){
        if(roomId.length===0){
            setError('Please enter room id')
            setTimeout(() => {
                setError('');
              },4000)
              return;
        }
        console.log("j1");
        socket.emit('joinExistingRoom', {username:user.userName, userId:user.userId, roomId});        
    }

    return (
        <div className="h-screen w-full relative bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
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
            <div className='relative flex w-11/12 mx-auto h-full flex-col 
            items-center justify-center gap-y-10'>
                <h1 className='font-bold text-yellow-100 font-edu-sa text-6xl translate-y-[-1rem]'>Join Game</h1>

                <div className='gap-x-2 w-50 h-15 flex justify-between'>
                    <input  value={roomId} onChange={(e) => setRoomId(e.target.value)} type='text' placeholder='Enter room Id'
                    className=' w-[15rem] placeholder:text-richblack-700 placeholder:text-[20px] text-[20px] rounded-md bg-richblue-100 px-5 py-2'/>

                    <button disabled={joined} onClick={handleClick} className='text-center text-[20px] w-[9rem] px-2 py-3 rounded-md font-semibold
                bg-yellow-500 text-white hover:scale-95 transition-all duration-200'>{joined?'Joined':'Join'}</button>
                </div>
                <div>
                {
                    joined ? <Link to={`/waitingRoom/${roomId}`}><button  className='text-center text-[20px] w-[9rem] px-2 py-3 rounded-md font-semibold
                bg-yellow-500 text-white hover:scale-95 transition-all duration-200'>Play Game</button></Link> : null
                }
                </div>
            </div>
        </div>
    )
}

export default JoinRoom
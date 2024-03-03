import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../reducer/Gameslice";
import bgImage from "../assets/bgmain.png";
import titlepic from "../assets/titlepic.png";
import Dicefront from "./Dicefront";
import mainAudio from "../assets/music/mainAudio.mp3";


const Home = () => {
    
  const userId = nanoid(5);

  const [userName,setuserName] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError]  = useState('');
  const dispatch = useDispatch();
    
  let song = new Audio(mainAudio);

  useEffect(() => {
    const handleInteraction = () => {
      song.play().catch(error => {
        console.error('Audio playback error:', error);
      });
      // Remove the event listener after the first interaction
      document.removeEventListener('click', handleInteraction);
    };
  
    // Add a click event listener to the document to detect user interaction
    document.addEventListener('click', handleInteraction);
  
    // Cleanup function to remove event listener when component unmounts
    return () => {
      song.pause();
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  const handleClick = () => {
    if(userName===" "){
        setError("Please Enter your name");
        setTimeout(()=>{
            setError('');
        },4000);
        return;
    }
    dispatch(addUser({userName,userId}));
    setShow(true);
  };

  return (
    <div className="h-screen w-full bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }} >
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
        <div className='overflow-y-hidden relative flex w-11/12 mx-auto h-5/6 flex-col items-center justify-center gap-y-12'>

            {/* <h2 className='font-bold text-yellow-100 font-edu-sa text-7xl translate-y-[-1rem]'></h2> */}
            <img src={titlepic} alt="title" className="h-[120px]"></img>
            {error.length>0 ? <p className='error'>{error}</p>:null}
            {
                !show && 
                <div className='gap-2 w-50 h-15 relative flex justify-between translate-y-[-1rem]'>
                    <input value={userName} onChange={(e) => setuserName(e.target.value)} type='text' placeholder='Enter your name' className=' placeholder:text-richblack-700 placeholder:text-[20px] text-[20px] rounded-md bg-richblue-100 px-5 py-2'/>
                    <button onClick={handleClick} className=' text-center text-[20px] w-[9rem] px-2 py-3 rounded-md font-semibold
            bg-yellow-500 text-white hover:scale-95 transition-all duration-200'>Let's Go</button>
                </div>
            }
            {
                show && 
                <div className='gap-4 w-70 relative flex justify-between translate-y-[-1rem]'>
                    <Link to={"/createRoom"}>
                        <button className=' text-center text-[20px] w-[9rem] px-2 py-3 rounded-md font-semibold
            bg-yellow-500 text-white hover:scale-95 transition-all duration-200'>Invite friend</button>
                    </Link>
                    <Link to={"/joinRoom"}>
                        <button className=' text-center text-[20px] w-[9rem] px-2 py-3 rounded-md font-semibold
            bg-yellow-500 text-white hover:scale-95 transition-all duration-200'>Join Room</button>
                    </Link>
                </div>
            }
        </div>
        <div className="rotDice">
            <div className="shadow"></div>
            <Dicefront nu={3}/>
        </div>

    </div>
  )
}

export default Home
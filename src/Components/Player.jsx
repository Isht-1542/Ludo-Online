import { useSelector } from "react-redux"
import Dice from "./Dice";
import { useEffect } from "react";
import userblue from "../assets/user.png"
import userred from "../assets/userred.png"
import usergreen from "../assets/usergreen.png"
import useryellow from "../assets/useryellow.png"

const Player = ({co, socket, setdiceVal, setdiceActive, diceActive, possibleMoveCheck}) => {

    const { ctoU } = useSelector((state) => state.game);

    useEffect(() => {
        console.log("Host page rendered again");
    },[ctoU]) 

    return (
        <div className="flex flex-col h-full md:h-2/5 w-[32%] md:w-full justify-center items-center">
            <div className="h-full w-full bg-grey-200 p-2">
                <div className="h-full w-full flex md:flex-col justify-center bg-white border-2 border-black shadow-lg rounded-xl overflow-hidden">
                    <div className={`flex flex-col h-full md:h-2/6 w-1/2 md:w-full items-center justify-center gap-1 md:gap-0
                    ${co==="blue" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-blue-400'}
                    ${co==="red" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-red-400'}
                    ${co==="green" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-lime-500'}
                    ${co==="yellow" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-yellow-400'}
                    `}>
                    {/* <!-- Player Icon --> */}
                        <div className="object-contain mt-1">
                            {co==="blue" && <img src={userblue} alt="gladiator" className="w-5 h-5 md:w-9 md:h-9 rounded-full"/>}
                            {co==="red" && <img src={userred} alt="gladiator" className="w-6 h-6 md:w-11 md:h-11 rounded-full"/>}
                            {co==="green" && <img src={usergreen} alt="gladiator" className="w-6 h-6 md:w-11 md:h-11 rounded-full"/>}
                            {co==="yellow" && <img src={useryellow} alt="gladiator" className="w-6 h-6 md:w-11 md:h-11 rounded-full"/>}
                            
                        </div>
                        {/* <!-- Player Name --> */}
                        {ctoU[co]!=null && <div className="text-center w-full text-wrap leading-[0.6rem] text-[0.6rem] md:text-base font-serif text-black">{ctoU[co]}</div>}
                    </div>
                    {/* <!-- Player Card Body --> */}
                    <div className="bg-gray-200 p-1 md:p-3 h-full md:h-4/6  w-1/2 md:w-full border-t border-gray-300">
                        <div className="bg-gray-400 rounded-md h-full w-full flex items-center justify-center">
                            <Dice socket={socket} co={co} setdiceVal={setdiceVal} setdiceActive={setdiceActive} diceActive={diceActive} possibleMoveCheck={possibleMoveCheck}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player
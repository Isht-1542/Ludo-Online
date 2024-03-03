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
        <div className="flex flex-col h-2/5 justify-center items-center">
            <div className="h-full w-full bg-grey-200 p-2">
                <div className="max-w-md h-full w-full flex flex-col justify-center bg-white border-4 border-black shadow-lg rounded-xl overflow-hidden">
                    <div className={`flex flex-col h-2/6 w-full items-center justify-center 
                    ${co==="blue" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-blue-400'}
                    ${co==="red" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-red-400'}
                    ${co==="green" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-lime-500'}
                    ${co==="yellow" && 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-yellow-400'}
                    `}>
                    {/* <!-- Player Icon --> */}
                        <div className="object-contain mt-1">
                            {co==="blue" && <img src={userblue} alt="gladiator" className="w-9 h-9 rounded-full"/>}
                            {co==="red" && <img src={userred} alt="gladiator" className="w-11 h-11 rounded-full"/>}
                            {co==="green" && <img src={usergreen} alt="gladiator" className="w-11 h-11 rounded-full"/>}
                            {co==="yellow" && <img src={useryellow} alt="gladiator" className="w-11 h-11 rounded-full"/>}
                            
                        </div>
                        {/* <!-- Player Name --> */}
                        {ctoU[co]!=null && <div className="text-center text-sm font-serif font-medium text-black">{ctoU[co]}</div>}
                    </div>
                    {/* <!-- Player Card Body --> */}
                    <div className="bg-gray-200 p-3 h-4/6 border-t border-gray-300">
                        <div className="bg-gray-400 rounded-md w-full flex items-center justify-center">
                            <Dice socket={socket} co={co} setdiceVal={setdiceVal} setdiceActive={setdiceActive} diceActive={diceActive} possibleMoveCheck={possibleMoveCheck}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player
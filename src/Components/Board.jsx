import Square from "./Square";
import star from '../assets/star1.jpeg'
import Piece from "./Piece";
import { useEffect, useState } from "react";


var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var arr2 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
var arr3 = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54];
var arr4 = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
var safe = [67, 33, 20, 7, 6, 40, 53, 66];
var safe1 = [33, 7, 40, 66];
var blue = [20, 26, 27, 28, 29, 30];
var red = [6, 5, 8, 11, 14, 17];
var green = [67, 68, 65, 62, 59, 56];
var yellow = [53, 47, 46, 45, 44, 43];

const Board = ({socket, board, movePiece, isMoveDone}) => {

    const [winColor, setwinColor] = useState([]);
    const [winNo, setwinNo] = useState([]);

    useEffect(() => {
        socket.on('winner', (wincolor, winno) => {
            console.log("winner:", wincolor," ", winno);
            console.log(typeof(wincolor));
            console.log(typeof(winno));
            setwinColor([...winColor, wincolor]);
            setwinNo([...winNo, winno]);
        })
    }, [])

    return (
            <div className="h-full w-full flex-col mx-auto rounded-md">
                
                <div className="h-2/5 w-full flex">
                    <div className="w-2/5 h-full">
                        <Square colorInd={0} movePiece={movePiece} isMoveDone={isMoveDone} board={board} winColor={winColor} winNo={winNo}/>
                    </div>
                    <div className="text-white h-full w-1/5 grid grid-cols-3 bg-yellow" >
                        {arr1.map((item, index) => (
                            <div key={index} id="item" className={`relative text-black rounded-md border border-black ${red.includes(item) ? 'bg-red-500':'bg-white'}`}>
                                {/* {item} */}
                                {safe1.includes(item) && 
                                <img src={star} alt="star" className="star absolute"/>}
                                {board["blue"].includes(item) && <Piece colorInd={0} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["red"].includes(item) && <Piece colorInd={1} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["green"].includes(item) && <Piece colorInd={2} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["yellow"].includes(item) && <Piece colorInd={3} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                            </div>
                        ))}
                    </div>
                    <div className="w-2/5 h-full">
                        <Square colorInd={1} movePiece={movePiece} isMoveDone={isMoveDone} board={board} winColor={winColor} winNo={winNo}/>
                    </div>
                </div>
                <div className="h-1/5 w-full flex">
                    <div className="text-white h-full w-2/5 grid grid-cols-6 bg-yellow" >
                        {arr2.map((item) => (
                            <div key={item} id="item" className={`relative text-black rounded-md border border-black ${blue.includes(item) ? 'bg-blue-500':'bg-white'}`}>
                                {item}
                                {safe1.includes(item) && 
                                <img src={star} alt="star" className="star absolute"/>}
                                {board["blue"].includes(item) && <Piece colorInd={0} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["red"].includes(item) && <Piece colorInd={1} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["green"].includes(item) && <Piece colorInd={2} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["yellow"].includes(item) && <Piece colorInd={3} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                            </div>
                        ))}
                    </div>

                    {/* Home */}
                    <div className="h-full w-1/5 flex flex-col items-center">
                        
                        <div className="flex w-full h-1/4">
                            <div className="h-full w-1/4 bg-gradient-to-tr from-blue-500 to-red-500"></div>
                            <div className="flex w-2/4 h-full bg-red-500 items-center justify-center">
                                {board["red"].map((item, index) => (
                                    item===100 && <div key={index} className="relative w-1/4 h-2/3"><Piece colorInd={1} movePiece={movePiece} id={item}/></div>
                                ))}
                            </div>
                            <div className="h-full w-1/4 bg-gradient-to-br from-red-500 to-yellow-500"></div>
                        </div>
                        
                        <div className="flex justify-between w-full h-2/4">
                            <div className="h-full w-1/4 bg-blue-500 flex flex-col justify-center items-center">
                                {board["blue"].map((item, index) => (
                                    item===100 && <div key={index} className="relative w-2/3 h-full"><Piece colorInd={0} movePiece={movePiece} id={item}/></div>
                                ))}
                            </div>

                            <div className="h-full w-2/4 flex justify-center items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-400 to-amber-200">HOME</div>

                            <div className="h-full w-1/4 bg-yellow-500 flex flex-col justify-center items-center">
                                {board["yellow"].map((item, index) => (
                                    item===100 && <div key={index} className="relative w-2/3 h-full"><Piece colorInd={3} movePiece={movePiece} id={item}/></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex w-full h-1/4">
                            <div className="h-full w-1/4 bg-gradient-to-tl from-green-500 to-blue-500"></div>
                            <div className="relative flex w-2/4 h-full bg-green-500 items-center justify-center">
                                {board["green"].map((item, index) => (
                                    item===100 && <div key={index} className="relative w-1/4 h-2/3"><Piece colorInd={2} movePiece={movePiece} id={item}/></div>
                                ))}
                            </div>
                            <div className="h-full w-1/4 bg-gradient-to-bl from-yellow-500 to-green-500"></div>
                        </div>
                    </div>
                    <div className="text-white h-full w-2/5 grid grid-cols-6 bg-yellow" >
                        {arr3.map((item, index) => (
                            <div key={index} id="item" className={`relative text-black rounded-md border border-black ${yellow.includes(item) ? 'bg-yellow-500':'bg-white'}`}>
                                {item}
                                {safe1.includes(item) && 
                                <img src={star} alt="star" className="star absolute"/>}
                                {board["blue"].includes(item) && <Piece colorInd={0} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["red"].includes(item) && <Piece colorInd={1} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["green"].includes(item) && <Piece colorInd={2} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["yellow"].includes(item) && <Piece colorInd={3} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-2/5 w-full flex">
                    <div className="w-2/5 h-full">
                        <Square colorInd={2} movePiece={movePiece} isMoveDone={isMoveDone} board={board} winColor={winColor} winNo={winNo}/>
                    </div>
                    <div className="text-white h-full w-1/5 grid grid-cols-3 bg-yellow" >
                        {arr4.map((item, index) => (
                            <div key={index} id="item" className={`relative text-black rounded-md border border-black ${green.includes(item) ? 'bg-green-500':'bg-white'}`}>
                                {item}
                                {safe1.includes(item) && 
                                <img src={star} alt="star" className="star absolute"/>}
                                {board["blue"].includes(item) && <Piece colorInd={0} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["red"].includes(item) && <Piece colorInd={1} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["green"].includes(item) && <Piece colorInd={2} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                                {board["yellow"].includes(item) && <Piece colorInd={3} movePiece={movePiece} id={item} isMoveDone={isMoveDone}/>}
                            </div>
                        ))}
                    </div>
                    <div className="w-2/5 h-full">
                        <Square colorInd={3} movePiece={movePiece} isMoveDone={isMoveDone} board={board} winColor={winColor} winNo={winNo}/>
                    </div>
                </div>
            </div>
    )
}

export default Board
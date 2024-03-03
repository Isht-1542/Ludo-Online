import blue from "../assets/pawn-blue.png"
import red from "../assets/pawn-red.png"
import green from "../assets/pawn-green.png"
import yellow from "../assets/pawn-yellow.png"
import { useSelector } from "react-redux"


const Piece = ({colorInd, movePiece, id}) => {
    
    const { color, isMoveDone } = useSelector((state) => state.game);

    var colorArray = ["blue", "red", "green", "yellow"];
    const handleClick = () => {
        console.log("movepiece call");
        console.log(color)
        console.log(colorArray[colorInd])
        console.log(isMoveDone)
        if(color!==colorArray[colorInd] || isMoveDone) return;
        console.log("startmove");
        console.log(typeof(id));
        movePiece(id,null);
    }

    return (
        <div className="absolute h-full w-full object-contain hover:cursor-move" onClick={handleClick}>
            {colorInd===0 && <img src={blue} alt="piece" className={`object-contain`}></img>}
            {colorInd===1 && <img src={red} alt="piece" className="object-contain"></img>}
            {colorInd===2 && <img src={green} alt="piece" className="object-contain"></img>}
            {colorInd===3 && <img src={yellow} alt="piece" className="object-contain"></img>}
        </div>
    )
}

export default Piece
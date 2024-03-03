import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMoveDone } from '../reducer/Gameslice';
import diceaudio from "../assets/music/diceroll.mp3"

const Dice = ({co, socket, setdiceVal, setdiceActive, diceActive, possibleMoveCheck}) => {

  const {color} = useSelector((state) => state.game);
  const [currColor, setcurrColor] = useState("blue");
  const dispatch = useDispatch();

  const randomDice = () => {

    const random = Math.floor(Math.random() * 10);
  
    if (random >= 1 && random <= 6) {
        roDice(random);
    }
    else {
        randomDice();
    }
  }

  function rollDice() {
    if(!diceActive || co!==color) return;
    randomDice();
    let song = new Audio(diceaudio);
    song.play();
  }

  const roDice = random => {
    var dice = document.getElementById('dice');
    dice.style.animation = 'rolling 1.4s';

    setTimeout(() => {
      switch (random) {
          case 1:
              dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
              break;
          case 6:
              dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
              break;
          case 2:
              dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
              break;
          case 5:
              dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
              break;
          case 3:
              dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
              break;
          case 4:
              dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
              break;

          default:
              break;
      }

      dice.style.animation = 'none';

    }, 1420);
    var t = random;
    console.log(t);
    setdiceVal(t);
    socket.emit('animDice', {plColor:color, val:t});
    setdiceActive(false);
    dispatch(changeMoveDone(false));
    setTimeout(() => {
      possibleMoveCheck(t);
    }, 2600);
  }



  useEffect(() => {
    socket.on('valDice', (val, plcolor) => {
      console.log("valuereceived:", val,plcolor);
      console.log(currColor);
      if(plcolor!==co) return;
      {
        var dice = document.getElementById('dice');
        let song = new Audio(diceaudio);
        song.play();
        dice.style.animation = 'rolling 1.3s';

        setTimeout(() => {
          switch (val) {
              case 1:
                  dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                  break;
              case 6:
                  dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                  break;
              case 2:
                  dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                  break;
              case 5:
                  dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                  break;
              case 3:
                  dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                  break;
              case 4:
                  dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                  break;
              default:
                  break;
          }

          dice.style.animation = 'none';

        }, 1460);
      }
  })
}, []);

  socket.on('visDice', (chanceColor) => {
    console.log("chancecolor:", chanceColor);
    setcurrColor(chanceColor);
  });


  return (
    <div className="container h-full w-full">
    {(currColor===co) &&
    <div className="container w-full h-full flex flex-col items-center mt-2" onClick={rollDice}>  
      <div id="dice" className={`dice hover:animate-none ${diceActive && 'motion-safe:animate-bounce'}`}>
          <div className="face front"></div>
          <div className="face back">
            <div className="dot six-1"></div>
            <div className="dot six-2"></div>
            <div className="dot six-3"></div>
            <div className="dot six-4"></div>
            <div className="dot six-5"></div>
            <div className="dot six-6"></div>
          </div>
          <div className="face top">
            <div className="dot two-1"></div>
            <div className="dot two-2"></div>
          </div>
          <div className="face bottom">
            <div className="dot five-1"></div>
            <div className="dot five-2"></div>
            <div className="dot five-3"></div>
            <div className="dot five-4"></div>
            <div className="dot five-5"></div>
          </div>
          <div className="face right">
            <div className="dot four-1"></div>
            <div className="dot four-2"></div>
            <div className="dot four-3"></div>
            <div className="dot four-4"></div>
          </div>
          <div className="face left">
            <div className="dot three-1"></div>
            <div className="dot three-2"></div>
            <div className="dot three-3"></div>
          </div>
      </div>

      <button className="roll">
          Roll Dice
      </button>
    </div>
    }
    </div>
  );
};

export default Dice;
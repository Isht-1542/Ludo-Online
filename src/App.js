import "./App.css";
//import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom"
import { io } from "socket.io-client";
import Home from "./Components/Home";
import CreateRoom from "./Components/createRoom"
import JoinRoom from "./Components/JoinRoom";
import Game from "./Components/Game";
import { nanoid } from "nanoid";
import WaitingRoom from "./Components/WaitingRoom";

const socket = io.connect('http://localhost:4000',{
  withCredentials: true,
});

function App() {

  const roomId = nanoid(7);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-black font-inter">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createRoom" element={<CreateRoom socket={socket} roomId={roomId}/>}></Route>
        <Route path="/joinRoom" element={<JoinRoom socket={socket}/>}></Route>
        <Route path="/waitingRoom/:roomId" element={<WaitingRoom socket={socket} roomId={roomId}/>}></Route>
        <Route path="/game/:roomId" element={<Game socket={socket} roomId={roomId}/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;

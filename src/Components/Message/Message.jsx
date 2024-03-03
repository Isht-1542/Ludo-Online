import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message: { text, player }}) => {
  let isSentByCurrentUser = false;

  const { user } = useSelector((state) => state.game);

  if (player === user.userName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="w-full flex justify-end">
      <div className="messageContainer w-5/6 rounded-md flex flex-col place-items-end mt-2 mr-1 bg-gradient-to-r from-red-800 to-amber-900">
        <p className="sentText text-sm text-amber-300 font-serif mr-1">You</p>
        <div className="messageBox text-lg font-sans rounded-md">
          <p className="messageText text-white text-wrap mr-1">{text}</p>
        </div>
      </div>
    </div>
    
  ) : (
    <div className="messageContainer w-5/6 rounded-md flex flex-col place-items-start mt-2 ml-1 bg-gradient-to-r from-indigo-900 to-blue-800">
      <p className="sentText text-sm text-cyan-500 font-serif ml-1">{player}</p>
      <div className="messageBox bg-Blue- text-lg font-sans rounded-md">
        <p className="messageText text-white text-wrap ml-1">{text}</p>
      </div>
    </div>
  );
};

export default Message;

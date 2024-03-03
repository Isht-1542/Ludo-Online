import React, { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages = ({ messages}) => {

  useEffect(() => {
    //console.log(messages);
  })
  
  return (
    <ScrollToBottom className="messages overflow-auto flex-auto">
      {messages.map((message, i) => (
        <div key={i} className="w-full">
          <Message message={message}/>
        </div>
      ))}
    </ScrollToBottom>
  )
};

export default Messages;

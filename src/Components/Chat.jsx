import { useEffect, useState } from "react";
import backgroundImage from "../assets/chatbg.jpg"
import Messages from "./Message/Messages";
import { IoSend } from "react-icons/io5";
import EmojiPicker  from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const Chat = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setshowEmojiPicker] = useState(false);

    useEffect(() => {
        //adds new messages to messages array
        socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
        });
    }, []);

    //sends the new message to server
    function sendMessage(event) {
        event.preventDefault();

        if (message) {
            setshowEmojiPicker(false);
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    }

    const handleEmojiClick = (emojiObject) => {
        console.log(emojiObject);
        setMessage(message + emojiObject.emoji); // Append the selected emoji to the message
    };

    return (
        <div className="h-[9rem] md:h-full w-full relative rounded-md flex justify-center items-center">
            <div className="absolute h-5/6 w-11/12 flex flex-col justify-between rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                {showEmojiPicker && <div className="relative"><EmojiPicker set="google" theme="auto" onEmojiClick={handleEmojiClick} width={280}/></div>}
                <Messages messages={messages} />
                <form className="form flex w-full mt-2 items-center justify-center gap-1">
                    <input
                    className="input w-10/12 rounded-md h-7 ml-2"
                    type="text"
                    placeholder=" Type a message..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onSubmit={(event) =>
                        event.key === "Enter" ? sendMessage(event) : null
                    }
                    />
                    <MdOutlineEmojiEmotions color="white" size={25} onClick={() => {setshowEmojiPicker(!showEmojiPicker)}}/>
                    <button className="w-2/12 text-white items-center rounded-md flex justify-center" onClick={(e) => sendMessage(e)}>
                        <IoSend color="white" size={22}/>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat
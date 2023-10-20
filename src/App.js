import "./App.css";

import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import upgrade from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImageLogo from "./assets/chatgptLogo.svg";

import { sendMessageToOpenAi } from "./openAi";
import { useEffect, useRef, useState } from "react";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, i'm TokhyGPT",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);

    const res = await sendMessageToOpenAi(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key == `Enter`) await handleSend();
  }; // add to input onKeyDown

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">TokhyGPT</span>
          </div>

          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}>
            <img src={addBtn} alt="New Chat" className="addBtn" />
            New Chat
          </button>

          <div className="upperSideBottom">
            <button className="query">
              <img src={msgIcon} alt="query" />
              Greeting
            </button>

            <button className="query">
              <img src={msgIcon} alt="query" />
              Introduction to React.js
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="home" className="listItemsImg" />
            Home
          </div>

          <div className="listItems">
            <img src={saved} alt="saved" className="listItemsImg" />
            Saved
          </div>

          <div className="listItems">
            <img src={upgrade} alt="upgrade" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          <div className="chat">
            <img src={userIcon} alt="" className="chatImg" />
            <p className="text">hey, how are you?</p>
          </div>

          <div className="chat bot">
            <img src={gptImageLogo} alt="" className="chatImg" />
            <p className="text">I'm fine!, how can i assist you today?</p>
          </div>

          {/* {messages.map((message, i) => (
            <div className={message.isBot ? "chat bot" : "chat"} key={i}>
              <img
                src={message.isBot ? gptImageLogo : userIcon}
                alt=""
                className="chatImg"
              />
              <p className="text">{message.text}</p>
            </div>
          ))} */}

          <div ref={msgEnd}></div>
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a Message"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="send">
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p>
            TokhyGPT May produce inaccurate information about people, places, or
            facts. TokhyGPT September 25 Version.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

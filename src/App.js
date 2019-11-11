import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Conversation from "./components/Conversation";
import ChatBubble from "./components/ChatComponents/ChatBubble";
import ChatableWrapper from "./components/ChatableWrapper";
import InputComponent from "./components/ChatComponents/InputComponent";
import QuickReply from "./components/ChatComponents/QuickReply";

function App() {
  return (
    <div className="App">
      <div
        style={{
          maxWidth: "400px",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "50px"
        }}
      >
        <Conversation>
          <ChatBubble text="hello chat" typingTime={400} />
          <QuickReply
            onSelect={() => {}}
            options={[
              { text: "Turtles", id: "tut" },
              { text: "Pancakes", id: "pan" }
            ]}
          />
          <ChatBubble text="Very cool!" typingTime={500} />
          <ChatableWrapper typingTime={500}>
            {next => <div onClick={next}>Hello conversation</div>}
          </ChatableWrapper>
          <InputComponent type="textBox" required onSubmit={() => {}} />
          <ChatableWrapper autoContinue typingTime={500}>
            <div>Auto continue chat component</div>
          </ChatableWrapper>
          <ChatBubble text="Super duper" typingTime={500} />
        </Conversation>
      </div>
    </div>
  );
}

export default App;

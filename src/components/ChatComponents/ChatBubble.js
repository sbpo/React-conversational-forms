import React, { Component } from "react";
import "../style/chatComponents.css";
import ChatAnimation from "./chatAnimation.js";
import PropTypes from "prop-types";

class ChatBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: true
    };
  }

  componentDidMount() {
    const { promise, typingTime, debugging, next } = this.props;
    if (promise) {
      promise().then(() => {
        this.setState({ typing: false }, () => next());
      });
    } else {
      setTimeout(
        () => {
          this.setState({ typing: false }, () => next());
        },
        debugging ? 0 : typingTime
      );
    }
  }

  render() {
    const { typing } = this.state;
    const { icon, answer, html, text } = this.props;
    const chatBubble = (
      <div
        className={`chat-row ${answer ? "right-row" : ""}`}
        ref={section => {
          this.textObject = section;
        }}
      >
        <div className={`bubble ${answer ? "answer-bubble" : "text-bubble"}`}>
          <p className="text">{html ? html : text}</p>
          {icon && <img src={icon} className="owner-icon" />}
        </div>
      </div>
    );
    const chatAni = (
      <ChatAnimation
        ref={section => {
          this.chatObject = section;
        }}
      />
    );

    return typing ? chatAni : chatBubble;
  }
}

ChatBubble.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element,
  answer: PropTypes.bool
};

export default ChatBubble;

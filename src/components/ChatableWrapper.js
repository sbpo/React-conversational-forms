import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatAnimation from "./ChatComponents/chatAnimation.js";

class ChatableWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: true
    };
  }
  componentDidMount() {
    const { promise, typingTime, debugging, next, children } = this.props;
    const autoContinue = typeof children !== "function";
    if (promise) {
      promise().then(() => {
        this.setState({ typing: false }, () => next());
      });
    } else {
      setTimeout(
        () => {
          this.setState({ typing: false }, () => autoContinue && next());
        },
        debugging ? 0 : typingTime
      );
    }
  }
  render() {
    const { typing } = this.state;
    const { children, next } = this.props;
    return typing ? (
      <ChatAnimation />
    ) : typeof children === "function" ? (
      children(next)
    ) : (
      children
    );
  }
}

ChatableWrapper.propTypes = {
  promise: PropTypes.any,
  typingTime: PropTypes.number,
  autoContinue: PropTypes.bool
};

export default ChatableWrapper;

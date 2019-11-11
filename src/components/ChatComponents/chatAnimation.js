import React, { Component } from "react";
import Lottie from "lottie-web";
import animation from "./dots.json";

class ChatAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lottieAnimation: false
    };
  }

  animationStyle = {
    height: "85px",
    marginTop: "-30px"
  };

  componentDidMount() {
    let anim = Lottie.loadAnimation({
      container: this.refs.dot,
      renderer: "svg",
      loop: true,
      animationData: animation
    });
    this.setState(
      {
        lottieAnimation: anim
      },
      () => {
        this.state.lottieAnimation.play();
      }
    );
  }

  render() {
    return <div id="dot" ref="dot" style={this.animationStyle}></div>;
  }
}

export default ChatAnimation;
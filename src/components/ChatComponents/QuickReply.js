import React, { Component } from "react";
import ChatBubble from "./ChatBubble";
import "./QuickReply.css";

class QuickReply extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelect(answer) {
    if (this.props.disabled) return;
    this.setState({
      typeSelected: answer.id,
      optionSelected: true,
      text: answer.text
    });
    this.props.onSelect(answer);
    this.props.next();
  }

  render() {
    const { options, disabled } = this.props;
    const { optionSelected, text } = this.state;

    let optionsJsx = options.map((a, i) => (
      <button
        key={i}
        className="answer"
        style={disabled ? { border: "1px solid #ccc", color: "#ccc" } : {}}
        onClick={() => this.onSelect(a)}
      >
        {a.text}
      </button>
    ));

    return (
      <div>
        <div className="answerContainer">{optionsJsx}</div>
        {optionSelected && (
          <ChatBubble
            answer={true}
            text={`${text}`}
            typingTime={0}
            next={() => {}}
          />
        )}
      </div>
    );
  }
}

export default QuickReply;

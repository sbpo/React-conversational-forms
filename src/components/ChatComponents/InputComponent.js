import React, { Component } from "react";
import "../style/chatComponents.css";
import PropTypes from "prop-types";

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      active: true,
      shouldUpdate: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = null;
    this.myDiv = null;
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { text, next } = this.props;
    if (text) {
      this.setState({
        value: text,
        active: false,
        shouldUpdate: true
      });
      next(true);
    }
  }

  componentDidUpdate() {
    if (this.state.active) {
      this.input.focus();
    }
    this.state.shouldUpdate &&
      this.setState(
        {
          shouldUpdate: false
        },
        this.goAnswer
      );
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const { value } = this.state;
    const { required, type, onError, onSubmit, next } = this.props;
    if (value === "" && required && onError)
      return onError("No value provided");

    if (type === "email" && !/.+@.+\..+/.test(value) && onError)
      return onError("Wrong email format");

    this.setState({
      active: false,
      shouldUpdate: true
    });
    onSubmit(value);
    next(true);
  }

  onClick() {
    const { active } = this.state;
    if (!active) {
      this.setState({
        active: true,
        shouldUpdate: true
      });
    }
  }

  goAnswer() {
    const { active } = this.state;
    let element = this.myDiv;
    if (active) {
      element.style.width = "100%";
    } else {
      element.style.width = "auto"; //get that new width:
      let sectionW = element.clientWidth + 30;

      var elementTransition = element.style.transition;
      element.style.transition = ""; // temporarily disable all css transitions

      element.style.width = "100%"; //set back the old with
      element.style.transition = elementTransition;

      // on the next frame (as soon as the previous style change has taken effect),
      requestAnimationFrame(function() {
        element.style.width = sectionW + "px";
      });
    }
  }

  render() {
    const { type, rows, placeholder } = this.props;
    const { active, value } = this.state;

    let inputField;
    if (type === "textArea") {
      inputField = (
        <textarea
          disabled={!active}
          ref={el => (this.input = el)}
          onChange={this.handleChange}
          value={value}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          autoFocus="true"
          rows={rows ? rows : 2}
        />
      );
    } else {
      inputField = (
        <input
          type={type ? type : "text"}
          disabled={!active}
          ref={el => (this.input = el)}
          onChange={this.handleChange}
          value={value}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          autoFocus="true"
        />
      );
    }

    return (
      <div className="chat-row right-row">
        <div
          className={`input-component ${
            active ? "input-box" : "bubble answer-bubble"
          }`}
          ref={c => (this.myDiv = c)}
          onClick={this.onClick}
        >
          {active && inputField}
          {active && (
            <button className="icon send" onClick={this.handleSubmit}>
              <ArrowRight />
            </button>
          )}
          {active || (
            <div className="icon edit-icon">
              <EditIcon />
            </div>
          )}
          {active || <p>{value ? value : <i>No input</i>}</p>}
        </div>
      </div>
    );
  }
}

InputComponent.propTypes = {
  type: PropTypes.oneOf(["text", "textArea", "email"]),
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

export default InputComponent;

const ArrowRight = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
  </svg>
);

const EditIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

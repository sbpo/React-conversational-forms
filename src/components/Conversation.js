import React, { Component } from "react";
import PropTypes from "prop-types";

import scrollToComponent from "react-scroll-to-component";
import "./style/ConvoForms.css";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: []
    };
    this.childrenWithProps = [];
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    const { children, debugging } = this.props;
    this.childrenWithProps = React.Children.map(children, (child, i) => {
      const newChild = React.cloneElement(child, {
        next: continueConversation => this.next(newChild, continueConversation),
        id: i,
        debugging: debugging
      });
      return newChild;
    }); //inject props to all children
    this.state.currentList.push(this.childrenWithProps.shift());
    this.setState({ currentList: this.state.currentList });
  }

  componentDidUpdate() {
    scrollToComponent(this.object, {
      offset: 20,
      align: "bottom",
      duration: 300
    });
  }

  next(child, continueConversation) {
    if (this.childrenWithProps.find(c => c.props.id === child.props.id)) {
      return;
    }

    if (
      continueConversation &&
      this.state.currentList[this.state.currentList.length - 1].props.id !==
        child.props.id
    )
      return; //hvis ikke sidst i listen (når værdien opdateres)

    while (
      !continueConversation &&
      child.props.id !==
        this.state.currentList[this.state.currentList.length - 1].props.id
    ) {
      this.childrenWithProps.unshift(this.state.currentList.pop());
    }

    if (this.childrenWithProps.length === 0) {
      if (this.props.next) this.props.next();
      return;
    }

    this.setState({ currentList: this.state.currentList }, () => {
      this.state.currentList.push(this.childrenWithProps.shift());
      this.setState({ currentList: this.state.currentList });
    });
  }

  render() {
    return (
      <div
        className="convo-forms"
        ref={section => {
          this.object = section;
        }}
      >
        {this.state.currentList}
      </div>
    );
  }
}

Conversation.propTypes = {
  debug: PropTypes.bool
};

export default Conversation;

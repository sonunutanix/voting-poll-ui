import React, { Component } from "react";
import PollOptions from "./PollOptions";

class PollQuestion extends Component {
  state = {
    options: [],
  };

  async componentDidMount() {
    const url = "http://localhost:8080/api/options/" + this.props.questionId;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await res.json();
    this.setState({ options: content.options });
  }

  render() {
    return (
      <div className="questions">
        <strong>{this.props.question}</strong>
        {this.state.options.map((option) => (
          <PollOptions
            key={option.id}
            option={option}
            userId={this.props.userId}
          ></PollOptions>
        ))}
      </div>
    );
  }
}

export default PollQuestion;

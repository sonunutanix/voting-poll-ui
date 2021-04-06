import React, { Component } from "react";
import { withRouter } from "react-router";

class PollOptions extends Component {
  state = {
    voteCount: this.props.option.Votes,
  };

  async optionClick(questionId, optionId) {
    const userId = this.props.userId;
    // Check If UserAlready Voted for the question
    const resp = await fetch("http://localhost:8080/api/question-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId,
        userId,
      }),
    });
    const questioncontent = await resp.json();
    if (questioncontent.msg === "Already voted") {
      alert("You have already Voted for this question");
      return;
    }

    //Increase the count of vote
    const url = "http://localhost:8080/api/option/" + optionId;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    this.setState({ voteCount: content.option.Votes });

    //saving the user Id and option Id
    await fetch("http://localhost:8080/api/option-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        optionId,
        userId,
      }),
    });
  }

  voteClick(optionId) {
    this.props.history.push("/user-list", { optionId: optionId });
  }

  render() {
    const options = this.props.option;
    return (
      <div className="options">
        <div onClick={() => this.optionClick(options.pollId, options.id)}>
          {options.option}
        </div>
        <div onClick={() => this.voteClick(options.id)}>
          {this.state.voteCount}
        </div>
      </div>
    );
  }
}

export default withRouter(PollOptions);

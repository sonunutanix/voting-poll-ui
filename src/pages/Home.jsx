import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:8080/api/getallpolls", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const content = await res.json();
    const questions = content.questions;
    this.setState({ questions: questions });
  }

  optionClick(quesId, optionId) {
    console.log("clicked: ", quesId, optionId);
  }
  voteClick(optionId) {
    console.log("ClickedOp", optionId);
    // this.props.history.push("/create-poll");
    <Redirect to="/create-poll" />;
  }
  render() {
    const ques = this.state.questions;
    console.log("ques:", this.props.userId);
    return (
      <div>
        {this.props.name ? "Hi " + this.props.name : "You are not logged in"}
        {ques.map((ques, indx) => (
          <div key={indx}>
            <div className="questions">
              <strong>{ques.Question}</strong>
            </div>
            <ul>
              {ques.Options.map((op, i) => (
                <div key={i} className="options">
                  <div
                    onClick={() => this.optionClick(ques.Id, op.id)}
                    className="voteCount"
                  >
                    {op.option}
                  </div>
                  <div
                    className="voteCount"
                    onClick={() => this.voteClick(op.id)}
                  >
                    {op.Votes}
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;

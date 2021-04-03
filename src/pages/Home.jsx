import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PollQuestion from "../components/PollQuestion";

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

  render() {
    const ques = this.state.questions;
    let menu;
    if (!this.props.name) {
      menu = <div>You are not logged in</div>;
    } else {
      menu = (
        <div>
          {ques.map((ques) => (
            <PollQuestion
              key={ques.id}
              questionId={ques.id}
              question={ques.question}
              userId={this.props.userId}
            ></PollQuestion>
          ))}
        </div>
      );
    }
    return menu;
  }
}

export default withRouter(Home);

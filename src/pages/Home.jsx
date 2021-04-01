import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      voteCount: 0,
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

  async optionClick(quesId, optionId) {
    //Increase the count of vote
    console.log("clicked: ", quesId, optionId);
    const url = "http://localhost:8080/api/option/" + optionId;
    console.log("url", url);
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    this.setState({ voteCount: content.option.Votes });
    //console.log("voteCount:", this.state.voteCount);

    // saving the user Id and option Id
    const userId = this.props.userId;
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
    //console.log("ClickedOp", optionId);
    this.props.history.push("/user-list", { optionId: optionId });
  }
  render() {
    const ques = this.state.questions;
    console.log("ques:", this.props.userId);
    let menu;
    if (!this.props.name) {
      menu = <div>You are not logged in</div>;
    } else {
      menu = (
        <div>
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
                      {/* <a href={"/user-list"}>{op.Votes}</a> */}
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    return menu;
  }
}

export default withRouter(Home);

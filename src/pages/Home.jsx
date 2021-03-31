import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    id: -1,
    question: "",
    options: [],
  };

  async componentDidMount() {
    const res = await fetch("http://localhost:8080/api/getallpolls", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const content = await res.json();
    const questions = content.questions;
    console.log("Ques", questions);
    for (let que of questions) {
      this.setState({ question: que.Question });
      this.setState({ id: que.Id });
      this.setState({ options: que.Options });
    }
    // this.setState({ question: questions });
    console.log("state ", this.state);
  }
  render() {
    return (
      <div>
        {this.props.name ? "Hi " + this.props.name : "You are not logged in"}
        <div> {this.state.question}</div>
        {this.state.options.map((ques, indx) => (
          <div key={indx}>
            <p>{ques}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: [],
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:8080/api/option-user/20", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const content = await res.json();
    const userName = content.users;
    this.setState({ userName: userName });
    console.log("user:", this.state.userName);
  }

  render() {
    const userList = this.state.userName;
    return (
      <div>
        Hello
        {userList.map((user, index) => (
          <div key={index}>
            <div>{user}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserList;

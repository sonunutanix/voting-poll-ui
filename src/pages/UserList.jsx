import React, { Component } from "react";
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: [],
    };
  }

  async componentDidMount() {
    const optionId = this.props.location.state.optionId;
    const url = "http://localhost:8080/api/option-user/" + optionId;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const content = await res.json();
    const userName = content.users;
    this.setState({ userName: userName });
  }

  render() {
    const userList = this.state.userName;
    if (userList) {
      return (
        <div>
          Users
          {userList.map((user, index) => (
            <div key={index}>
              <div>{user}</div>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No vote count</div>;
    }
  }
}

export default UserList;

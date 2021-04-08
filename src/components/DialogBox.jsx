import React, { Component } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

class DialogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: [],
    };
  }

  render() {
    const usersName = this.props.usersName;
    // console.log("user", usersName);
    return (
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={this.props.showModel}
      >
        <h2 className="model-text">Users Name: </h2>
        <div className="model-text">
          {usersName ? (
            usersName.map((user, index) => (
              <div key={index}>
                <span>{user}</span>
              </div>
            ))
          ) : (
            <div>No vote count</div>
          )}
        </div>
        <button className="cancel-btn" onClick={this.props.onShowDialog}>
          {" "}
          Close
        </button>
      </Modal>
    );
  }
}

export default DialogBox;

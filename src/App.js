import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreatePoll from "./pages/CreatePoll";
import UserList from "./pages/UserList";
import { useHistory } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(-1);
  let history = useHistory();
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await res.json();
      setName(content.user.name);
      setUserId(content.user.id);
    })();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />
        <main className="form-signin">
          <Route
            path="/"
            exact
            component={() => (
              <Home name={name} userId={userId} history={history} />
            )}
          />
          <Route path="/login" component={() => <Login setName={setName} />} />
          <Route path="/register" component={Register} />
          <Route path="/create-poll" component={CreatePoll} />
          <Route path="/user-list" component={UserList} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

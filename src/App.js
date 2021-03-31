import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreatePoll from "./pages/CreatePoll";

function App() {
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await res.json();
      setName(content.user.name);
    })();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />
        <main className="form-signin">
          <Route path="/" exact component={() => <Home name={name} />} />
          <Route path="/login" component={() => <Login setName={setName} />} />
          <Route path="/register" component={Register} />
          <Route path="/create-poll" component={CreatePoll} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const CreatePoll = () => {
  const [fields, setFields] = useState([{ value: null }]);
  const [redirect, setRedirect] = useState(false);
  const [question, setQues] = useState("");

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    if (values[i].value === "" && values.length > 1) {
      removeField(i);
    } else {
      const len = values.length;
      if (i === len - 1 && values[i].value) {
        addField();
      }
    }
  }

  function addField() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function removeField(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  const submit = async () => {
    const values = [...fields];
    const options = [];
    for (let value of values) {
      if (value.value) {
        options.push(value.value);
      }
    }
    await fetch("http://localhost:8080/api/create-poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        options,
      }),
    });

    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <div className="question-input">
        <input
          type="text"
          placeholder="Enter your question"
          onChange={(e) => setQues(e.target.value)}
        />
      </div>
      {fields.map((field, idx) => {
        return (
          <div key={idx} className="option-input">
            <input
              type="text"
              placeholder="Enter option"
              value={field.value || ""}
              onChange={(e) => handleChange(idx, e)}
            />
          </div>
        );
      })}
      <button className="submit-btn" type="submit" onClick={() => submit()}>
        Submit
      </button>
    </div>
  );
};

export default CreatePoll;

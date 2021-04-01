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
    } //else if (){
    //     handleAdd();
    // }
  }

  function handleAdd() {
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
      options.push(value.value);
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
      <div>
        <input
          type="text"
          placeholder="Enter your question"
          onChange={(e) => setQues(e.target.value)}
        />
      </div>
      <button type="button" onClick={() => handleAdd()}>
        +
      </button>

      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input
              type="text"
              placeholder="Enter option"
              value={field.value || ""}
              onChange={(e) => handleChange(idx, e)}
            />
          </div>
        );
      })}
      <button
        className="w-50 btn btn-lg btn-primary"
        type="submit"
        onClick={() => submit()}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePoll;

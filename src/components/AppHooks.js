import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input } from "@rocketseat/unform";

import { Container } from "./styles.js";

export default function AppHooks() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const response = await axios.get(
        "https://annotation-to-ives.herokuapp.com/notes"
      );

      const { data } = response;

      setNotes(data.reverse()); // No backend ele não lista o mais atual
    }

    getNotes();
  }, []);

  const handleSubmit = async data => {
    try {
      await axios.post("https://annotation-to-ives.herokuapp.com/notes", data);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(
        `https://annotation-to-ives.herokuapp.com/notes/${id}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async id => {
    console.log(`id: ${id}`);
  };

  return (
    <div className="App">
      <div>
        <h2>Notes System</h2>
      </div>

      <Container>
        <div className="grid">
          <Form onSubmit={handleSubmit} className="myForm">
            <Input
              name="title"
              maxLength="27"
              type="text"
              placeholder="Title"
              className="formField"
            />
            <Input
              multiline
              name="description"
              type="text"
              placeholder="Annotation"
              className="formField"
            />
            <div>
              <label className="alert"></label>
              <button type="submit" className="myButton">
                ADD
              </button>
            </div>
          </Form>

          {notes.map(data => (
            <div key={data.id} className="myList">
              <p>Title:</p>
              <label> {data.title} </label> <br />
              <p>Annotation:</p>
              <textarea
                readOnly
                className="annotationText"
                value={data.description}
              />{" "}
              <br />
              <div className="div__button">
                <button
                  onClick={() => handleDelete(data.id)}
                  className="myListButton"
                >
                  DELETE
                </button>
                <button
                  onClick={() => handleEdit(data.id)}
                  className="myListButton1"
                >
                  EDIT
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

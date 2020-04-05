import React, { useState, useRef } from "react";
import Lottie from "react-lottie";

import { Form } from "@unform/web";

import Input from "./components/Input";
import note from "./note.json";
import { Container } from "./styles/style";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: note,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

let updating = false;
let index = 0;

export default function App() {
  const formRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [cards, setCards] = useState([]);

  function handleSubmit(data, { reset }) {
    const { title, annotation } = data;
    let inputTitle = formRef.current.getFieldValue("title");
    let inputAnnotation = formRef.current.getFieldValue("annotation");

    if (inputTitle === "" || inputAnnotation === "") {
      setAlert(true);
    } else {
      if (updating) {
        let newCards = [...cards];
        newCards[index] = { title, annotation };

        setCards(newCards);

        updating = false;
      } else {
        setCards([...cards, { title, annotation }]);
      }

      setAlert(false);
      reset();
    }
  }

  function handleDelete(title) {
    let del = cards.map((e) => e.title).indexOf(title);

    cards.splice(del, 1);

    setCards([...cards]);
  }

  function handleUpdate(title, annotation) {
    formRef.current.setFieldValue("title", title);
    formRef.current.setFieldValue("annotation", annotation);

    let i = cards.map((e) => e.title).indexOf(title);
    index = i;

    updating = true;
  }

  return (
    <Container>
      <Lottie options={defaultOptions} height={150} width={150} />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <label>Title:</label>
        <Input name="title" type="text" />
        <label>Annotation</label>
        <Input name="annotation" type="text" />
        <button type="submit">ADD</button>

        <p className="alert" style={{ display: alert ? null : "none" }}>
          Required fields!
        </p>
      </Form>

      <div>
        {cards.map((data, i) => (
          <div key={i}>
            <label>Title:</label>
            <p>{data.title}</p>
            <label>Annotation:</label>
            <p>{data.annotation}</p>

            <button onClick={() => handleDelete(data.title)}>DELETE</button>
            <button onClick={() => handleUpdate(data.title, data.annotation)}>
              EDIT
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}

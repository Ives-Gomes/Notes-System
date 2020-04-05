import React, { useState, useRef } from "react";
import Lottie from "react-lottie";

import { Form } from "@unform/web";

import Swal from "../node_modules/sweetalert2/dist/sweetalert2.all.min.js";
import Input from "./components/Input";
import InputMessage from "./components/InputMessage";
import note from "./note.json";
import { Container } from "./styles/style";

export default function App() {
  const formRef = useRef(null);
  const [defaultOptions, SetDefaultOptions] = useState({
    loop: true,
    autoplay: true,
    animationData: note,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });
  const [updating, setUpdating] = useState(false);
  const [index, setIndex] = useState(0);
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

        setUpdating(false);
        handleAlert();
      } else {
        setCards([...cards, { title, annotation }]);
      }

      reset();
      setAlert(false);
    }
  }

  function handleDelete(title) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Se você apagar essa anotação não poderá resgatá-la!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, pode deletar!",
      cancelButtonText: "Não, deixa quieto...",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Sucesso!", "Anotação deletada!", "success");

        let del = cards.map((e) => e.title).indexOf(title);

        cards.splice(del, 1);

        setCards([...cards]);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado!", "Sua anotação está segura!", "error");
      }
    });
  }

  function handleUpdate(title, annotation) {
    formRef.current.setFieldValue("title", title);
    formRef.current.setFieldValue("annotation", annotation);

    let i = cards.map((e) => e.title).indexOf(title);
    setIndex(i);

    setUpdating(true);
  }

  function handleAlert() {
    Swal.fire("Sucesso!", "Anotação editada!", "success");
  }

  return (
    <Container>
      <Lottie options={defaultOptions} height={150} width={150} />

      <div className="grid">
        <Form className="myForm" ref={formRef} onSubmit={handleSubmit}>
          <Input
            className="formField"
            placeholder="Title"
            name="title"
            type="text"
          />
          <InputMessage
            className="formField"
            placeholder="Annotation"
            name="annotation"
            type="text"
          />
          <button className="myButton" type="submit">
            ADD
          </button>

          <label className="alert" style={{ display: alert ? null : "none" }}>
            Required fields!
          </label>
        </Form>

        {cards.map((data, i) => (
          <div key={i} className="myList">
            <p>Title:</p>
            <label>{data.title}</label>
            <p>Annotation:</p>
            <textarea
              readOnly
              className="annotationText"
              value={data.annotation}
            />

            <div className="div__button">
              <button
                onClick={() => handleDelete(data.title)}
                className="myListButton"
              >
                DELETE
              </button>
              <button
                onClick={() => handleUpdate(data.title, data.annotation)}
                className="myListButton1"
              >
                EDIT
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

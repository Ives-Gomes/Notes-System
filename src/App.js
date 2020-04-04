import React, { useState } from 'react';
import { Form } from '@unform/web';
import Input from './components/Input';

export default function App() {
  const [cards, setCards] = useState([]);

  function handleSubmit(data, { reset }) {
    const { title, annotation } = data;

    setCards([...cards, { title, annotation }]);

    reset();
  }

  function handleDelete(title) {
    let del = cards.map((e) => e.title ).indexOf(title);

    cards.splice(del, 1);

    setCards([...cards]);  
  }

  function handleUpdate(title, annotation) {
    let update = cards.map((e) => e.title ).indexOf(title);

    setCards([...cards]); 
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label>Title:</label>
        <Input name="title" type="text" />
        <label>Annotation</label>
        <Input name="annotation" type="text" />

        <button type="submit">ADD</button>
      </Form>

      <div>
        {cards.map((data, i) =>
          <div key={i}>
            <label>Title:</label>
            <p>{data.title}</p>
            <label>Annotation:</label>
            <p>{data.annotation}</p>

            <button onClick={() => handleDelete(data.title)}>DELETE</button>
            <button onClick={() => handleUpdate(data.title, data.annotation)}>EDIT</button>
          </div> 
        )}
      </div>   
    </>
  );
}
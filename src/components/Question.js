import React from 'react';
import { decode } from 'he'; // decoding weird characters from API call

export default function Question(props) {
  // structuring the data from API 👇
  const content = {
    question: props.question,
    answers: props.answers,
    selected_answer: props.selected_answer,
    correct_answer: props.correct_index,
  };
  // console.log(content)

  const handleClick = (e) => {
    console.log(e.target.id);
  };
  const answersArray = content.answers.map((answer, idx) => (
    <button
      key={idx}
      id={idx}
      onClick={handleClick}
      className={
        idx === content.selected_answer
          ? 'button light selected'
          : 'button light'
      }
    >
      {decode(answer)}
    </button>
  ));

  return (
    <div className='question'>
      <h2 className='question-title'>{decode(content.question)}</h2>
      <div className='question-btn-wrapper'>{answersArray}</div>
      <hr />
    </div>
  );
}

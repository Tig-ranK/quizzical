import React from 'react';
import { decode } from 'he'; // decoding weird characters from API call

export default function Question(props) {
  // structuring the data from API 👇
  const content = {
    question: props.question,
    answers: props.answers,
    correct_answer: props.correct_index,
  };
  // console.log(content)
  const answersArray = content.answers.map((answer, idx) => (
    <button key={idx} className={idx===content.correct_answer ? 'button correct' : 'button incorrect'}>
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

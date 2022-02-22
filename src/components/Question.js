import React from 'react';
import {decode} from 'he'
export default function Question(props) {
  // structuring the data from API 👇
  const content = {
    category: props.content.category,
    difficulty: props.content.difficulty,
    question: props.content.question,
    answers: [...props.content.incorrect_answers, props.content.correct_answer],
  };
  console.log(content)
  const answersArray = content.answers.map(
    (answer, idx) => (
      <button
        key={idx}
        className={
          idx === props.selected ? 'button light selected' : 'button light'
        }
        onClick={() => props.selectAnswer(props.index, idx)}
      >
        {decode(answer)}
      </button>
    )
  );

  return (
    <div className='question'>
      <h2 className='question-title'>{decode(content.question)}</h2>
      <div className='question-btn-wrapper'>{answersArray}</div>
      <hr />
    </div>
  );
}

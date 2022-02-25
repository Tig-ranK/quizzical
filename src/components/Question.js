import React from 'react';
import { decode } from 'he'; // decoding weird characters from API call

export default function Question(props) {
  const answersArray = props.answers.map((answer, idx) => {
    function findClass() {
      if (props.check) {
        if (idx === props.correctAnswer) return 'button correct';
        if (idx === props.selectedAnswer) return 'button incorrect discarded';
        return 'button discarded';
      } else {
        return idx === props.selectedAnswer
          ? 'button light selected'
          : 'button light';
      }
    }
    return (
      <button
        key={idx}
        id={idx}
        onClick={props.chooseAnswer}
        className={findClass()}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className='question'>
      <h2 className='question-title'>{decode(props.question)}</h2>
      <div className='question-btn-wrapper'>{answersArray}</div>
      <hr />
    </div>
  );
}

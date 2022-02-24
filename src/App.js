import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Question from './components/Question';
import { nanoid } from 'nanoid';
import './styles.scss';

async function fetchData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json.results;
}

export default function App() {
  const [selected, setSelected] = useState([0, 0, 0, 0, 0]);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]);
  function handleClick() {
    setStart((prev) => !prev);
  }

  useEffect(() => {
    const url =
      'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple';
    fetchData(url).then(setData);
  }, []);

  function selectAnswer(questionNumber, answerNumber) {
    setSelected((prev) => {
      let copy = prev.slice();
      copy[questionNumber] = answerNumber;
      return copy;
    });
  }
  const questionArray = selected.map((elem, index) => (
    <Question
      content={data[index]}
      key={nanoid()}
      index={index}
      selected={elem}
      selectAnswer={selectAnswer}
    />
  ));

  return (
    <div className='container'>
      {start ? <>{questionArray}</> : <Splash handleClick={handleClick} />}
    </div>
  );
}

// {false && (
//   <label className='question-score' htmlFor='play_again'>
//     You scored 3/5 correct answers.
//   </label>
// )}
// <button id='play_again' className='button dark'>
//   Play again
// </button>

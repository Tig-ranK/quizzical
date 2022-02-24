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
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  function handleClick() {
    if (questions.length !== 0) setStart((prev) => !prev);
  }

  useEffect(() => {
    const url =
      'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple';
    fetchData(url).then((res) =>
      setQuestions(
        res.map(({ question, correct_answer, incorrect_answers }) => {
          let answers = [...incorrect_answers];
          const correct_index = Math.floor(Math.random() * 4);
          answers.splice(correct_index, 0, correct_answer); // inserting the correct answer to a random place

          return {
            question,
            answers,
            correct_index,
            selected_answer: 0,
            id: nanoid(),
          };
        })
      )
    );
  }, []);

  useEffect(() => {
    console.table(questions);
  }, [questions]);
  // function selectAnswer(questionNumber, answerNumber) {
  //   setSelected((prev) => {
  //     let copy = prev.slice();
  //     copy[questionNumber] = answerNumber;
  //     return copy;
  //   });
  // }

  const questionsArray = questions.map(
    ({ id, question, answers, correct_index, selected_answer }) => (
      <Question
        key={id}
        question={question}
        answers={answers}
        correct_index={correct_index}
        selected_answer={selected_answer}
      />
    )
  );
  return (
    <div className='container'>
      {start ? (
        <>
          {questionsArray}
          <button id='play_again' className='button dark'>
            Play again
          </button>
        </>
      ) : (
        <Splash handleClick={handleClick} />
      )}
    </div>
  );
}

/* <label className='question-score' htmlFor='play_again'>
You scored 3/5 correct answers.
</label> */

import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Question from './components/Question';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './styles.scss';

async function fetchData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json.results;
}

export default function App() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correctAmount, setCorrectAmount] = useState({
    show: false,
    amount: 0,
  });
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const url =
      'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple';
    if (check === false)
      fetchData(url).then((res) =>
        setQuestions(
          res.map(({ question, correct_answer, incorrect_answers }) => {
            let answers = [...incorrect_answers];
            const correctAnswer = Math.floor(Math.random() * 4);
            answers.splice(correctAnswer, 0, correct_answer); // inserting the correct answer to a random place

            return {
              question,
              answers,
              correctAnswer,
              selectedAnswer: 0,
              id: nanoid(),
            };
          })
        )
      );
  }, [check]);

  const handleStart = () => {
    if (questions.length !== 0) setStart((prev) => !prev);
  };

  const chooseAnswer = (e, id) => {
    !check &&
      setQuestions((prev) =>
        prev.map((question) => {
          if (question.id === id) {
            return { ...question, selectedAnswer: Number(e.target.id) };
          } else {
            return question;
          }
        })
      );
  };

  const questionsArray = questions.map(
    ({ id, question, answers, correctAnswer, selectedAnswer }) => (
      <Question
        key={id}
        question={question}
        answers={answers}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        chooseAnswer={(e) => chooseAnswer(e, id)}
        check={check}
      />
    )
  );

  const checkCorrect = () => {
    let counter = 0;
    for (let question of questions) {
      if (question.selectedAnswer === question.correctAnswer) counter++;
    }
    return counter;
  };

  return (
    <div className='container'>
      {correctAmount === 5 && <Confetti />}
      {start ? (
        <>
          {questionsArray}

          <div className='question-score-wrapper'>
            {check && (
              <label className='question-score' htmlFor='play_again'>
                You scored {correctAmount}/5 correct answers.
              </label>
            )}
            <button
              id='play_again'
              className='question-play_again'
              onClick={() => {
                setCheck((prev) => !prev);
                setCorrectAmount(checkCorrect());
              }}
            >
              {!check ? 'Check answers' : 'Play again'}
            </button>
          </div>
        </>
      ) : (
        <Splash handleStart={handleStart} />
      )}
    </div>
  );
}

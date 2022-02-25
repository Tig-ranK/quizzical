import React from 'react';

export default function Splash({ handleStart }) {
  return (
    <div className='splash'>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button className='button dark' onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Question from './components/Question';
import { nanoid } from 'nanoid';
import './styles.scss';

export default function App() {
  const [selected, setSelected] = useState([1, 4, 2, 3, 1]);
  const [start, setStart] = useState(true);
  function handleClick() {
    setStart((prev) => !prev);
  }
  
  useEffect(() => {}, []);

  const questionArray = selected.map((elem) => (
    <Question selected={elem} id={nanoid()} />
  ));
  return (
    <div className='container'>
      {start ? <>{questionArray}</> : <Splash handleClick={handleClick} />}
    </div>
  );
}

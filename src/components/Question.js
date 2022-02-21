import React from 'react';

export default function Question(props) {
  return (
    <div className='question'>
      <h2 className='question-title'>How would one say goodbye in Spanish?</h2>
      <div className="question-btn-wrapper">
        <button className='button light'>Adios</button>
        <button className='button light'>Hola</button>
        <button className='button light'>Au Revoir</button>
        <button className='button light'>Salir</button>
      </div>
      <hr />
    </div>
  );
}

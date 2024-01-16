import React, { useEffect, useReducer } from 'react';

const url = 'http://localhost:2000/questions';
const initState = {
  questions: [],
  index: 0,
  status: '',
  highScore: 0,
  score: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET-SUCCESS':
      return { ...state, status: 'ready', questions: action.payload };
    case 'GET-ERROR':
      return { ...state, status: 'error' };
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: 'GET-SUCCESS', payload: data }))
      .catch(() => dispatch({ type: 'GET-ERROR' }));
  }, []);
console.log(questions);
  return (
    <div className='container max-w-7xl mx-auto pt-6'>
      {status === 'ready' ? (
        <div>
          {questions.map((question, index) => (
            <div key={index} className='card'>
              <h2>{question.question}</h2>
              <p>{question.id}</p>
              {/* Add more JSX to render other properties of the question */}
            </div>
          ))}
        </div>
      ) : status === 'error' ? (
        <div>Error loading questions</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;

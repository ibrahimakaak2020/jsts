import React, { useEffect, useReducer, useState } from 'react';
const url = "http://localhost:2000/questions";
const initialState = {
  index: 0,
  score: 0,
  status: 'loading',
};

const quizReducer = (state, action) => {
  console.log("--------------------------------")
  console.log(action.payload);
  console.log("--------------------------------")
  switch (action.type) {
    case 'START_QUIZ':
      return { ...state, status: 'ready' };
    case 'ANSWER_QUESTION':
      const isCorrect = action.payload === action.questions[state.index].correctAnswer;
      const updatedScore = isCorrect ? state.score + 1 : state.score;
      const nextIndex = state.index + 1;
      const nextStatus = nextIndex < action.questions.length ? 'active' : 'finished';
      return {
        ...state,
        index: nextIndex,
        score: updatedScore,
        status: nextStatus,
      };
    case 'RESTART_QUIZ':
      return { ...initialState, status: 'ready' };
    default:
      return state;
  }
};

const Loading = () => <div>Loading...</div>;

const Ready = ({ onStart }) => (
  <div>
    <h2>Ready to start</h2>
    <button onClick={onStart}>Start Quiz</button>
  </div>
);

const Question = ({ question, options, onAnswer }) => (
  <div>
    <h2>Question</h2>
    <p>{question.question}</p>
    <ul>
      {options.map((option, i) => (
        <li key={i}>
          <button onClick={() => onAnswer(option)}>{option}</button>
        </li>
      ))}
    </ul>
  </div>
);

const Finished = ({ score, onRestart }) => (
  <div>
    <h2>Quiz Finished!</h2>
    <p>Your score: {score}</p>
    <button onClick={onRestart}>Restart Quiz</button>
  </div>
);

const App = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [questions,setQuestions]=useState([]);
  useEffect(() => {
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => setQuestions(data) )
        .catch(() => console.log("error"));
}, []);
  const handleAnswer = (answer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer, questions });
  };

  
  const handleStart = () => {
    dispatch({ type: 'START_QUIZ' });
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART_QUIZ' });
  };

  let content;
  switch (state.status) {
    case 'loading':
      content = <Loading />;
      break;
    case 'ready':
      content = <Ready onStart={handleStart} />;
      break;
    case 'active':
      const currentQuestion = questions[state.index];
      content = (
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
        />
      );
      break;
    case 'finished':
      content = <Finished score={state.score} onRestart={handleRestart} />;
      break;
    default:
      content = null;
  }

  return <div>{content}</div>;
};

export default App;

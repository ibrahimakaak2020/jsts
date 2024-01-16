import React, { useEffect, useReducer } from 'react';
import Question from './Question';
const url = 'http://localhost:2000/questions';
const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};


function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // return {
    //   ...state,
    //   points: 0,
    //   highscore: 0,
    //   index: 0,
    //   answer: null,
    //   status: "ready",
    // };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}


function App() {
  const [{ questions, status,index ,answer}, dispatch] = useReducer(reducer, initialState);
 
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  // useEffect(() => {
  //   fetch(url)
  //     .then((resp) => resp.json())
  //     .then((data) => dispatch({ type: 'GET-SUCCESS', payload: data }))
  //     .catch(() => dispatch({ type: 'GET-ERROR' }));
  // }, []);
  useEffect(function () {
    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

const handleNext=(e)=>{
  e.preventDefault();
  dispatch({ type: "nextQuestion"});

}
console.log(questions);
  return (
    <div className='container max-w-7xl mx-auto pt-6'>

      {status === 'ready' ? (
        <div>
      
          <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <button onClick={handleNext}>Next</button>
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

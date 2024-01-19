import React, { useEffect, useReducer } from "react";
import Pending from './Pending';
import Error from './Error';
import Ready from './Ready';
import Question from './Question';
import Fininsh from "./Fininsh";

const url = "http://localhost:2000/questions";
const initState = {
  questions: [],
  index: 0,
  status: "pending",
  highScore: 0,
  score: 0,
  answer:null,
  totalScore:400
};
function reducer(state, action) {
  const result = state.questions[state.index];
  switch (action.type) {
    case "GET-SUCCESS":
      return { ...state, status: "ready", questions: action.payload };
    case "GET-ERROR":
      return { ...state, status: "error" };
      case "Testing":
        return { ...state, status: "testing",index:state.index +1,answer:null };
      case "newquestion":
        return { ...state,answer:state.index ,score:(result.answer=== action.payload?state.score+10:state.score) ,};
      case "Finishing":
        return { ...state, status: "finish", score:state.score,totalScore:(state.index+1)*10 };
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [{ questions, status, index,score,totalScore,answer }, dispatch] = useReducer(
    reducer,
    initState
  );
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "GET-SUCCESS", payload: data }))
      .catch(() => dispatch({ type: "GET-ERROR" }));
  }, []);
  
  return (
    <div>
      {status === "pending" &&  <Pending/>}
      {status === "error" && <Error /> }
      {status === "ready" && (<Ready dispatch={dispatch}/>)}
      {status === "testing" && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
      {status === "finish" && <Fininsh score={score}  totalScore={totalScore}/>}
      <span className="font-bold text-2xl text-white">{index+1}</span>
    {(index+1)===20?<button className="btn btn-ui" onClick={() =>dispatch({type:"Finishing"})}>Check The Results</button> :<button className="btn btn-ui" onClick={() =>dispatch({type:"Testing"})}>Next Question</button>}
    </div>
  );
}
export default App;

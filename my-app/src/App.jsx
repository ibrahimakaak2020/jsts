import { useEffect, useReducer, useState } from 'react'
const url='http://localhost:2000/questions';
const initState={
  questions:[],
  index:0,
  status:"",
  highScore:0,
  score:0
};

function reducer(state,action) {
  switch (action.type) {
    case "GET-SUCCESS":
      return {...state,status:"ready",questions:action.payload}
    case "GET-ERROR":
      return {status:"error"}
    default:
      break;
  }
}

function App() {
  const [{questions,index,score,highScore,status}, dispatch] =useReducer(reducer,initState);
  useEffect(
    ()=>{
      fetch(url)
      .then((resp)=> resp.json())
      .then((data)=>dispatch({type:"GET-SUCCESS",payload:data}))
      .catch((err)=>dispatch({type:"GET-SUCCESS"}));

    },
    []
  );

  return (
    <div className='container max-w-7xl mx-auto pt-6'>
   
     
      <div className="card">
       
       
       
      </div>
     
    </div>
  )
}

export default App

import React, { useEffect, useReducer } from 'react'
import Header from './Header';
import Load from './Load';
import Error from './Error';
import Question from './Question';
const url = "http://localhost:2000/questions";
const initState = {
    questions: [],
    index: 0,
    status: 'loading',
    highScore: 0,
    score: 0,
    hasAnswered:null
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
  const [{ questions, status, index ,hasAnswered}, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => dispatch({ type: 'GET-SUCCESS', payload: data }))
            .catch(() => dispatch({ type: 'GET-ERROR' }));
    }, []);
    
    return (
        <div>
         <Header/> 
            {status === 'loading' ? (
            <Load/>
           ):status === 'ready'?( !hasAnswered &&
           <Question question={questions[index]} dispatch={dispatch}/>): (
           
            <Error />
            )}
        </div>
    );
}
export default App;
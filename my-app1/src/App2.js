import React, { useEffect, useReducer } from 'react'
import Header from './Header';
import Load from './Load';
import Error from './Error';
import Question from './Question';
import Ready from './Ready';
const url = "http://localhost:2000/questions";
const initState = {
    questions: [],
    index: 0,
    status: 'loading',
    answer: null,
    highScore: 0,
    score: 0,
    hasAnswered:null
};
function reducer(state, action) {
    const question = state.questions.at(state.index);
    switch (action.type) {
        case 'GET-SUCCESS':
            return { ...state, status: 'ready', questions: action.payload };
        case 'ACTIVE':
            return { ...state, status: 'active' };
        case 'NEXT':
            return { ...state,index:state.index++ };
        case 'newAnswer':
           return {...state,
                answer: action.payload,
                points:
                  action.payload === question.correctOption
                    ? state.points + question.points
                    : state.points,
              };
        
        
        case 'GET-ERROR':
            return { ...state, status: 'error' };
        default:
            throw new Error('Action unknown');
    }
  }
function App() {
  const [{ questions, status, index ,hasAnswered ,answer}, dispatch] = useReducer(reducer, initState);
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
           ): status==='ready'?(<Ready dispatch={dispatch}/>):status==='active'?(<><Question question={questions[index]} dispatch={dispatch} answer={answer}/> 
           <button className='btn btn-ui' onClick={()=>dispatch({index:index+1})}>Next Question</button></>): (
            
             <Error />
             )}
        </div>
    );
}
export default App;
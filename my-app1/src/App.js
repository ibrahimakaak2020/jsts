import React, { useEffect, useReducer } from 'react'
/* const url = 'http://localhost:2000/questions';
const initState = {
    questions: [],
    statestatus: "ready",
    index: 0
}; */
const url = 'http://localhost:2000/questions';
const initState = {
    questions: [],
    index: 0,
    status: '',
    highScore: 0,
    score: 0
};
/* function reducer(state, action) {
    console.log(state);
    switch (action.type) {
        case "GET-SUCCESS":
            return { ...state, statestatus: 'ready', questions: action.payload }
        case "GET-ERROR":
            return { ...state, statestatus: 'error' }

        default:
            throw new Error("Unknown Resources ...");
    }
} */
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
    // const [{ questions, statestatus, index }, dispatch] = useReducer(reducer, initState);
    const [{ questions, status, index }, dispatch] = useReducer(reducer, initState);

    /*    useEffect(    
           () => {
               fetch(url)
               .then((response) => response.json())
               .then((data) =>{ return dispatch({ type: "SUCCESSFULL", payload: data })})
               .catch(() => dispatch({ type: "UNSUCCESSFUL" }))}
          , []); */
    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => dispatch({ type: 'GET-SUCCESS', payload: data }))
            .catch(() => dispatch({ type: 'GET-ERROR' }));
    }, []);

    console.log(questions[index].question)

    return (
        <div>
            {status === 'ready' ? (<h1>SUCCESS</h1>) : (<div><h1>error in fetching results</h1></div>)}
        </div>
    )
};

export default App;
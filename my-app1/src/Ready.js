import React from 'react';

const Ready = ({dispatch}) => {

    const handleStart=()=>{
        dispatch({type:"ACTIVE"})
    }
    return (
        <div>
            <h1>Computer Quis Ready Click  Next</h1>
            <button onClick={handleStart}>Start</button>
            
        </div>
    );
}

export default Ready;

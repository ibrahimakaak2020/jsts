import React from 'react'

export default function Fininsh({score,totalScore}) {
  return (
    <div>
        <h1>You are Completed The Testing </h1>
        <span> You Score is </span>
        <p>{score}</p>
        <p>Total Score is : {totalScore}</p>
    </div>
  )
}

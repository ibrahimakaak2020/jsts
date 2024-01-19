import Options from "./Options";

function Question({ question, dispatch,answer}) {

  return (<>
    <div className="max-w-6xl mx-auto">
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
   
  
    </>
  );
}

export default Question;
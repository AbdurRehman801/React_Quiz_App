import React, { useEffect, useState } from 'react'
import './Quiz.css'
import CircularProgress from '@mui/material/CircularProgress';
import Question from '../../components/Question/Question';

const Quiz = ({ name, score, setScore, setQuestions, questions }) => {
  const [options, setOptions] = useState();
  const [currQuestion, setCurrQuestion] = useState(0)


  useEffect(() => {
    setOptions(
      questions &&
      handleShuffle([
        questions[currQuestion]?.correct_answer,
        ...questions[currQuestion]?.incorrect_answers,
      ])
    );
  }, [currQuestion, questions]);

  const handleShuffle = (optionss) => {
    return optionss?.sort(() => Math?.random() - 0.5);
  };
  console.log(currQuestion, "hello")

  return (
    <div className='quiz'>
      <span className='subtitle'>Welcome, {name}</span>
      {questions ? (
        <>
          <div className='quizInfo'>
            <span>{questions[currQuestion]?.category}</span>
            <span>Score: {score}</span>
          </div>
          <Question
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            questions={questions}
            options={options}
            correct={questions[currQuestion]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color='inherit'
          size={150}
          thickness={1}
        />
      )}
    </div>
  )
}

export default Quiz
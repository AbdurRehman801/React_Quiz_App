import React, { useState } from 'react'
import './Question.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



const Question = ({
    currQuestion,
    setCurrQuestion,
    questions,
    options,
    correct,
    score,
    setScore,
    setQuestions
}) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    let navigate = useNavigate();

    const handleSelect = (i) => {
        if (selected === i && selected === correct) {
            return "select";
        } else if (selected === i && selected !== correct) {
            return "wrong";
        } else if (i === correct) {
            return "select";
        }
    }
    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score + 1);
        setError(false)
    }
    const handleNext = () => {
        if(currQuestion > 8){
            navigate("/result");
        }else if(selected){
            setCurrQuestion(currQuestion + 1);
            setSelected();
        }else{
            setError("Please Select An Option First")
        }
    }
    const handleQuit = () => {
        setCurrQuestion(0);
        setQuestions();
    }
    return (
        <div className='question'>
            <h1>Question {currQuestion + 1}</h1>
            <div className='singleQuestion'>
                <h2>{questions[currQuestion].question}</h2>
                <div className='options'>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {options && options.map((i) => (<button
                        onClick={() => handleCheck(i)}
                        className={`singleOption ${selected && handleSelect(i)}`}
                        key={i}
                        disabled={selected}
                    >{i}</button>))}
                </div>
                <div className='controls'>
                    <Button
                        variant='contained'
                        color='secondary'
                        size="large"
                        style={{ width: 185 }}
                        href='/'
                        onClick={handleQuit}
                    >Quit</Button>
                    <Button     
                        variant='contained'
                        color='primary'
                        size="large"
                        style={{ width: 185 }}
                        onClick={handleNext}
                    >   {currQuestion > 20 ? "Submit" : "Next Question"}</Button>
                </div>
            </div>
        </div>
    )
}

export default Question
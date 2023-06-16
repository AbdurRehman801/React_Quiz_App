import React, { useState } from 'react'
import './Home.css'
import quizImage from '../../images/quiz.svg'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Categories from '../../Data/Categories';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const Home = ({ name, setName, fetchQuestions }) => {
    // const [name, setName] = useState('')
    const [category, setCategory] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [errors, setErrors] = useState(false)
    let navigate = useNavigate();
    const handleSubmit = () => {
        if (!category || !difficulty || !name) {
            setErrors(true)
            return;
        } else {
            setErrors(false)
            fetchQuestions(category, difficulty)
            navigate('/quiz')
        }
    }
    return (
        <div className='content'>
            <div className='settings'>
                <span style={{ fontSize: 30 }}>
                    Quiz Setting
                </span>
                <div className='settings-select'>
                    {errors && <ErrorMessage>Please Fill Out All Fields</ErrorMessage>}
                    <TextField id="outlined-basic" label="Enter Your Name" variant="outlined" style={{ marginBottom: 25 }} onChange={(e) => setName(e.target.value)} />
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select the Category"
                        variant="outlined"
                        style={{ marginBottom: 25 }}
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        {Categories.map((cat) => (
                            <MenuItem key={cat.category} value={cat.value}>
                                {cat.category}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select the Difficulty"
                        variant="outlined"
                        style={{ marginBottom: 25 }}
                        onChange={(e) => setDifficulty(e.target.value)}
                        value={difficulty}
                    >
                        <MenuItem key="Easy" value='easy'>
                            Easy
                        </MenuItem>
                        <MenuItem key="Medium" value='medium'>
                            Medium
                        </MenuItem>
                        <MenuItem key="Hard" value='hard'>
                            Hard
                        </MenuItem>
                    </TextField>
                    <Button variant="contained" color='primary' size='large' onClick={handleSubmit}>Start Quiz</Button>
                </div>

            </div>
            <img src={quizImage} alt="quizImage" className='banner' />
        </div>
    )
}

export default Home
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import bg from './images/ques1.png'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer'
import Home from './Pages/Home/Home'
import Result from './Pages/Results/Result';
import Quiz from './Pages/Quiz/Quiz';
import axios from 'axios';


function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState('');
  const [score, setScore] = useState(0)
  const fetchQuestions = async (category = '', difficulty = '') => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results)

  }
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path="/quiz" element={<Quiz name={name} questions={questions} score={score} setScore={setScore} setQuestions={setQuestions} />} />
          <Route path="/result" element={<Result score={score} name={name} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

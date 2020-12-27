import React, { useState, useEffect, FormEvent } from 'react'
import Header from './components/Header/Header'
import Question from './components/Quesiton/Question'
import Result from './components/Result/Result'
import { fetchQuestions } from './services/quiz_services'
import { questionType } from './types/quiz_types'
import './App.css'
import Spinner from './components/Spinner/Spinner'


const App = () => {

  const [questions, setQuestions] = useState<questionType[]>([])
  const [quizStart, setQuizStart] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [quizComplete, setQuizComplete] = useState<boolean>(false)

  const [score, setScore] = useState<number>(0)
  const userAnswers = useState<string>("")

  const [index, setIndex] = useState<number>(0)
  const [amount, setAmount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<string>("");

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setQuizStart(true)
  }

  const nextQuestion = () => {
    if (index + 1 === amount) {
      setQuizComplete(true)
    }
    else {
      if (userAnswers[0] === questions[index].correct_answer) {
        setScore(1 + score);
      }
      setIndex(index + 1)
      userAnswers[1]("")
    }
  }

  const startAgain = () => {
    setQuestions([])
    setQuizStart(false)
    setIsLoading(true)
    setQuizComplete(false)
    setScore(0)
    userAnswers[1]("")
    setIndex(0)
    setAmount(5)
    setDifficulty('easy')
  }

  useEffect(() => {
    console.log("useEffect")
    setIsLoading(true)
    const fetchData = async () => {
      const temp = await fetchQuestions(amount, difficulty)
      setQuestions(temp)
      setIsLoading(false)
    }
    fetchData()
  }, [amount, difficulty])

  return (
    <div>
      <Header />

      <div className="container">

        {quizStart ?
          isLoading ?
            <Spinner /> :
            quizComplete ?
              <Result score={score} total={amount} callback={startAgain} /> :
              <Question
                totalQuestions={amount}
                currentQuestion={index + 1}
                callback={nextQuestion}
                question={questions[index].question}
                answers={questions[index].option}
                userSelection={userAnswers}
              />
          :
          <>
            <div className="row form-section ">
              <div className="col">
                <form onSubmit={(e) => submit(e)}>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Enter No. of Questions:</label>
                    <input min={1} max={50} required value={amount} onChange={(e) => { setAmount(+(e.target.value)) }} type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Select Level of Difficulty:</label>
                    <select className="form-control" onChange={(e) => setDifficulty(e.target.value)} >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-block">Submit</button>
                </form>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default App
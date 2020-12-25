import React from 'react'
import './Question.css'

type Props = {
    totalQuestions: number,
    currentQuestion: number,
    callback: () => void
    question: string,
    answers: string[],
    userSelection: any
}

const Question: React.FC<Props> = ({ totalQuestions, currentQuestion, callback, question, answers, userSelection }) => {
    const [userAnswers, setUserAnswers] = userSelection;
    const click = (e: any) => {
        setUserAnswers(e.target.innerHTML)
    }
    return (
        <div className="row quiz-section">
            <div className="col ">
                <p className="question-number">Question: {currentQuestion}/{totalQuestions}</p>
                <div className="question">
                    <div className="h2 ">{question}</div>
                    <ul className="list-group">
                        {answers.map((answer: string) => (
                            <li key={answer} value={answer} className="list-group-item"   >
                                <a className="answer" onClick={(e) => click(e)} >
                                    {answer}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="text-right next-btn">
                        <button type="button" className="btn" onClick={callback}>Next Question</button>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Question

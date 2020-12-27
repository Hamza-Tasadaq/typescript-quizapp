import React, { useState } from 'react'
import './Question.css'

type Props = {
    totalQuestions: number,
    currentQuestion: number,
    callback: () => void
    question: string,
    answers: readonly string[],
    userSelection: any,
}

const Question: React.FC<Props> = ({ totalQuestions, currentQuestion, callback, question, answers, userSelection }) => {
    const [isActive, setIsActive] = useState<boolean[]>([false, false, false, false])


    const onClicked = (e: any) => {
        userSelection[1](e.target.innerHTML)
        for (let i = 0; i < isActive.length; i++) {
            if (i === +(e.target.id)) {
                isActive[i] = true
            }
            else {
                isActive[i] = false
            }
        }
        setIsActive(isActive)
    }

    const next = () => {
        callback()

        const temp: boolean[] = [false, false, false, false]
        setIsActive(temp)
    }
    return (
        <div className="row quiz-section">
            <div className="col ">
                <p className="question-number">Question: {currentQuestion}/{totalQuestions}</p>
                <div className="question">
                    <div className="h2 ">{question}</div>
                    <ul className="list-group">
                        {answers.map((answer: string, index: number) => {
                            return (
                                <>
                                    <li id={index.toString()} key={answer} value={answer} className={`list-group-item answer ${isActive[index] ? " active" : ""}`} onClick={(e) => onClicked(e)}  >
                                        {answer}
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                    <div className="text-right next-btn">
                        <button type="button" className="btn" onClick={next} >{totalQuestions === currentQuestion ? "Submit" : "Next Quesiton"}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Question

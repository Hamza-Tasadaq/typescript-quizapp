import React from 'react'
import './Result.css'

type Props = {
    score: number,
    total: number,
    callback: any
}

const Result: React.FC<Props> = ({ score, total, callback }) => {
    return (
        <div className="row result-section text-center">
            <div className="col">
                <h3 className="username">congratulations!!</h3>
                <div className="h2">Your Score is:{score}/{total}
                    <span className="h4" />
                </div>
                <div className="text-center">
                    <button type="button" className="btn again-btn" onClick={callback}>Start Again</button>
                </div>
            </div>
            <br />
        </div>

    )
}

export default Result

import { quizTypes, questionType } from "../types/quiz_types";


const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)


export const fetchQuestions = async (amount: number, difficulty: string): Promise<questionType[]> => {
    const api = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    let data = await (await (await fetch(api)).json()).results;
    const finalData: questionType[] = data.map((questionObj: quizTypes) => {
        return {
            question: questionObj.question,
            correct_answer: questionObj.correct_answer,
            option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })
    return finalData;
}
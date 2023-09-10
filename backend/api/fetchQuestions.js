import axios from "axios";
import Question from "../model/question.js";

const apiUrl = "https://api.api-ninjas.com/v1/trivia";
const categories = ['music', 'mathematics', 'geography', 'entertainment'];
const apiKey = 'pCb3Suwg5B0wcgZLMw6GuA==YPzcjB6BfYEvX3GK';

const headers = {
  'X-Api-Key': apiKey,
}
// const category = 'music';

const fetchAndStoreQuestions = async () => {
    for(const category of categories) {
        try {
            const res =  await axios.get(`${apiUrl}?category=${category}&limit=30`, { headers: headers});
            const quesWithAns = res.data;
            await Question.insertMany(quesWithAns.map(({ question, answer }) => ({
                category,
                questionText: question,
                correctAnswer: answer,
            })));
            console.log(`Fetched and stored ${quesWithAns.length} questions for ${category}`);
        } catch (err) {
            console.log(`Error fetching questions for ${category}: ${err.message}`)
        }
        }
}

export default fetchAndStoreQuestions;
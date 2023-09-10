import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

type Props = {}

interface Question {
    _id: string;
    category: string;
    questionText: string;
    correctAnswer: string;
  }
  
const FetchQues = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);

    const categories: string[] =['music', 'mathematics', 'geography', 'entertainment'];

    useEffect(() => {
        setSelectedCategory(categories[0]); 

        fetchRandomQuestions(categories[0]);
    }, [])

    const fetchRandomQuestions = async (category: string) => {
        await axios.get(`/questions/${category}`)
          .then((response) => {
            setQuestions(response.data);
            console.log(response.data);
            setUserAnswers(new Array(response.data.length).fill(''));
          })
          .catch((error) => {
            console.error('Error fetching questions:', error);
          });
      };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        fetchRandomQuestions(newCategory);
        setScore(0);
        };
        
    const handleUserAnswerChange = (index: number, answer: string) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[index] = answer;
        setUserAnswers(updatedUserAnswers);
        };

    const calculateScore = async () => {
        let newScore = 0;
        for (let i=0; i<questions.length; i++) {
            const userAns = userAnswers[i]?.toLowerCase();
            const correctAns = questions[i].correctAnswer.toLowerCase();
            if (userAns === correctAns) {
                newScore++;
            }
        }
        setScore(newScore);

        try {
            const response = await axios.post('/testHistory', {
              category: selectedCategory,
              score: score,
            });
        
            // Optionally, you can handle the response or show a success message.
            console.log('Test score stored:', response.data);
          } catch (error) {
            console.error('Error storing test score:', error);
          }
    }

  return (
    <div>
    <h1>Questionnaire</h1>

    {/* Category selection dropdown */}
    <select value={selectedCategory} onChange={handleCategoryChange}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    {/* Button to fetch questions */}
    <button onClick={() => fetchRandomQuestions(selectedCategory)}>
      Fetch Questions
    </button>

    {/* Display questions */}
    <div>
      {questions.map((question, index) => (
        <div key={question._id}>
          <p>{question.questionText}</p>
          <input
            type="text"
            placeholder="Your answer"
            value={userAnswers[index] || ''}
            onChange={(e) => handleUserAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>

    {/* Submit button to calculate and display the score */}
    <button onClick={calculateScore}>Submit</button>
    <p>Score: {score}/10</p>
  </div>
  )
}

export default FetchQues
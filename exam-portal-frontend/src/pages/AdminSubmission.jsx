import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ...

const AdminSubmission = () => {
    const { examId, studentId } = useParams();
    const [exam, setExam] = useState(null);
    const [questionTexts, setQuestionTexts] = useState([]);
    const [answerTexts, setAnswerTexts] = useState([]);
    const [marks, setMarks] = useState('');

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/admin-view-exams/${examId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const exam = await response.json();
                setExam(exam);

                // Fetch question text for each question ID
                const questionData = await Promise.all(exam.questionIds.map(async id => {
                    const response = await fetch(`http://localhost:5001/api/admin-view-question/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const question = await response.json();
                    return { text: question.questionText, correctAnswer: question.correctAnswer, marks: question.marks };
                }));

                setQuestionTexts(questionData);

                // Fetch answer text for each question ID and student ID
                const answerTexts = await Promise.all(exam.questionIds.map(async id => {
                    const response = await fetch(`http://localhost:5001/api/admin-view-answer/${id}/${studentId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const answer = await response.json();
                    return answer.answerText;
                }));

                setAnswerTexts(answerTexts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchExamDetails();
    }, [examId]);

    const publishResult = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/publish-result/${examId}/${studentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ totalMarksObtained }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Result published successfully!");
        } catch (error) {
            console.error(error);
        }
    };


    const totalMarksObtained = questionTexts.reduce((total, question, index) => {
        return total + (answerTexts[index] === question.correctAnswer ? question.marks : 0);
    }, 0);

    return (
        <div>
            {exam && (
                <>
                    <h2>Exam Details:</h2>
                    <p>Name: {exam.name}</p>
                    <p>Duration: {exam.duration}</p>
                    <p>Total Marks: {exam.totalMarks}</p>
                    <p>Marks Obtained: {totalMarksObtained}</p>
                    <h2>Question IDs and Texts:</h2>
                    {questionTexts.map((question, index) => (
                        <div key={index}>
                            <p>Question: {question.text}</p>
                            <p>Correct Answer: {question.correctAnswer}</p>
                            <p>Marks: {question.marks}</p>
                            <p>Answer: {answerTexts[index]}</p>
                            <p>Marks Obtained: {answerTexts[index] == question.correctAnswer ? question.marks : 0}</p>
                        </div>
                    ))}
                    <button onClick={publishResult}>Publish Result</button>
                </>
            )}
        </div>
    );
}
export default AdminSubmission;
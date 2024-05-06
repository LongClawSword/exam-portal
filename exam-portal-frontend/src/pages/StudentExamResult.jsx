import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StudentExamResult() {
  const { studentId, examId } = useParams();
  const [result, setResult] = useState({});
  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch(`http://localhost:5001/api/view-result/${examId}/${studentId}`);
      if (response.status === 404) {
        setResult({ message: 'Result not published' });
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resultData = await response.json();
      setResult(resultData);
    };

    fetchResult();
  }, [examId, studentId]);


  useEffect(() => {
    const fetchExam = async () => {
      const response = await fetch(`http://localhost:5001/api/student-exam/${examId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const examData = await response.json();
      setExam(examData);
    };

    fetchExam();
  }, [examId]);


  useEffect(() => {
    const fetchQuestions = async () => {
      if (exam && exam.questionIds) {
        const promises = exam.questionIds.map(async (questionId) => {
          const response = await fetch(`http://localhost:5001/api/student-question/${questionId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const questionData = await response.json();

          const answerResponse = await fetch(`http://localhost:5001/api/student-view-answer/${studentId}/${questionId}`);
          if (!answerResponse.ok) {
            throw new Error(`HTTP error! status: ${answerResponse.status}`);
          }
          const answerData = await answerResponse.json();

          return { ...questionData, answer: answerData };
        });

        const questionsData = await Promise.all(promises);
        setQuestions(questionsData);
      }
    };

    if (exam) {
      fetchQuestions();
    }
  }, [exam]);

  return (
    <div>
      {result.message ? (
        <p>{result.message}</p>
      ) : (
        <>
          <h2>Exam Details:</h2>
          <p>Name: {exam?.name}</p>
          <p>Duration: {exam?.duration}</p>
          <p>Total Marks: {exam?.totalMarks}</p>
          <p>Total Marks Obtained: {result.totalMarksObtained}</p>
          <p>Subject: {exam?.subject}</p>
          {questions.map((question, index) => (
            <div key={index}>
              <p>Question: {question.questionText}</p>
              <p>Correct Answer: {question.correctAnswer}</p>
              <p>Marks: {question.marks}</p>
              {question.answer && <p>Student's Answer: {question.answer.answerText}</p>}
              <p>Marks Obtained: {question.answer && question.answer.answerText === question.correctAnswer ? question.marks : 0}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
export default StudentExamResult;
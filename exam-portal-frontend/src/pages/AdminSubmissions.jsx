import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminSubmissions = () => {
    const [exam, setExam] = useState(null);
    const [students, setStudents] = useState([]);
    const { examId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/admin-view-exams/${examId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const exam = await response.json();
                setExam(exam);

                // Fetch student names
                const studentPromises = exam.studentIds.map(studentId =>
                    fetch(`http://localhost:5001/api/students/${studentId}`).then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                );

                const students = await Promise.all(studentPromises);
                setStudents(students);

            } catch (error) {
                console.error(error);
            }
        };

        fetchExamDetails();
    }, [examId]);

    const viewSubmission = (studentId) => {
        navigate(`/admin-submission/${examId}/${studentId}`);
      };

    return (
        <div>
            {exam && (
                <>
                    <h2>Exam Details:</h2>
                    <p>Name: {exam.name}</p>
                    <p>Subject: {exam.subject}</p>
                    <p>Duration: {exam.duration}</p>
                    <p>Total Marks: {exam.totalMarks}</p>
                    {students.length > 0 && (
                        <>
                            <h2>Students:</h2>
                            {students.map((student, index) => (
                                <div key={index}>
                                    <p>{student.name}</p>
                                    <button onClick={() => viewSubmission(exam.studentIds[index])}>View Submission</button>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default AdminSubmissions;
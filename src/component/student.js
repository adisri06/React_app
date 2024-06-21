import React, { useState } from 'react';
import Students from './students';
import { Button, TextField } from '@mui/material';
import '../css/Student.css';

const Student = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', age: 20, grade: 'A' },
        { id: 2, name: 'Jane Smith', age: 22, grade: 'B' }
    ]);

    const addStudent = (newStudent) => {
        const newStudentWithId = { id: students.length + 1, ...newStudent };
        setStudents(prevStudents => [...prevStudents, newStudentWithId]);
    };

    return (
        <div className="student-container">
            <h1>Student List</h1>
            {/* The addstudent function of parentclass is passed to the child component , then only it can modify the prop value */}
            {/* Students : child component with whom we share 
            students(small s) : its the statevariable of parent class
            {students} pass an object which is passed  */}

            <Students students={students} addStudent={addStudent} />
        </div>
    );
};

export default Student;

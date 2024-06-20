import React, { useState } from 'react';
import Students from './students';
import { Button, TextField } from '@mui/material';
import '../css/Student.css';

const Student = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', age: 20, grade: 'A' },
        { id: 2, name: 'Jane Smith', age: 22, grade: 'B' }
    ]);

    const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddStudent = () => {
        setStudents(prevStudents => [
            ...prevStudents,
            { id: prevStudents.length + 1, ...newStudent }
        ]);
        setNewStudent({ name: '', age: '', grade: '' });
    };

    return (
        <div className="student-container">
            <h1>Student List</h1>
            <Students students={students} />
            <h2>Add New Student</h2>
            <form className="student-form">
                <TextField
                    label="Name"
                    name="name"
                    value={newStudent.name}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Age"
                    name="age"
                    type="number"
                    value={newStudent.age}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Grade"
                    name="grade"
                    value={newStudent.grade}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddStudent}
                    className="add-student-button"
                >
                    Add Student
                </Button>
            </form>
        </div>
    );
};

export default Student;

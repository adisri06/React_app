// src/Students.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';

const Students = ({ students, addStudent }) => {
    const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = () => {
        addStudent(newStudent);
        setNewStudent({ name: '', age: '', grade: '' });
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Add New Student</h2>
            <TextField label="Name" name="name" value={newStudent.name} onChange={handleChange} />
            <TextField label="Age" name="age" type="number" value={newStudent.age} onChange={handleChange} />
            <TextField label="Grade" name="grade" value={newStudent.grade} onChange={handleChange} />
            <Button onClick={handleAdd}>Add Student</Button>
        </div>
    );
};
//prop types to ensure prop are of expected type
Students.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            grade: PropTypes.string.isRequired
        })
    ).isRequired,
    addStudent: PropTypes.func.isRequired
};

export default Students;

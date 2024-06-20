import React from 'react';
import PropTypes from 'prop-types';

const Students = ({ students }) => {
    return (
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
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.grade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
// PropTypes to ensure the props are of the expected type
Students.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            grade: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Students;

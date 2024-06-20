// src/Employee.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Already some employees are present in the useState 
const Employee = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', age: 30, department: 'Development' },
        { id: 2, name: 'Jane Smith', age: 25, department: 'Design' },
        { id: 3, name: 'Sam Brown', age: 35, department: 'Management' }
    ]);
    // use as a boolen true or false , by default fault so dialog box is closed
    const [open, setOpen] = useState(false);
    // State variable for a new employee
    const [newEmployee, setNewEmployee] = useState({ name: '', age: '', department: '' });

    const handleClickOpen = () => {
       //dialog box is open here 
        setOpen(true);
    };

    const handleClose = () => {
        //once employee added dialog box is closed
        setOpen(false);
    };

    const handleChange = (e) => {
        //e.target property is a reference to the element that triggered the event
        const { name, value } = e.target;

        setNewEmployee(prevState => ({ //prevState parameter is used within state update functions to refer to the previous state before the update
            ...prevState,
            [name]: value
        }));
    };

    const handleAddEmployee = () => {

        //     prevEmployees is the current state of the employees array.
// ...prevEmployees spreads the elements of the current employees array into a new array.
        setEmployees(prevEmployees => [
            ...prevEmployees,
            { id: prevEmployees.length + 1, ...newEmployee }
        ]);
        setNewEmployee({ name: '', age: '', department: '' });
        handleClose();
    };

    return (
       
        <div style={{ padding: '20px' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Department</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(employee => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.age}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleClickOpen}
            >
                Add Employee
            </Button>
            {/* open={open} is used with the Dialog component from Material-UI to control whether the dialog is visible or not.  */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={newEmployee.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="age"
                        label="Age"
                        type="number"
                        fullWidth
                        value={newEmployee.age}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="department"
                        label="Department"
                        type="text"
                        fullWidth
                        value={newEmployee.department}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEmployee} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Employee;


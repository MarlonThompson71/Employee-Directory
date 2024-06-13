import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedEmployee = { id, firstName, lastName, jobTitle };
        try {
            const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEmployee),
            });
            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('Failed to update employee');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employees/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setJobTitle(data.jobTitle);
                } else {
                    throw new Error('Failed to fetch employee data');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployee();
    }, [id]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Update Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Employee</button>
            </form>
            <hr />
            <button className="btn btn-dark" onClick={() => navigate('/')}>
                Back to Employee List
            </button>
        </div>
    );
};

export default UpdateEmployeeForm;

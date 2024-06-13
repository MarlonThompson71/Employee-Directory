import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddEmployeeForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/employees/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, jobTitle }),
            });
            if (response.ok) {
                // Reset form fields after successful submission
                setFirstName('');
                setLastName('');
                setJobTitle('');
                // Redirect back to homepage
                navigate('/');
            } else {
                throw new Error('Failed to save employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">MarlonCorp</Link>

                </div>
            </nav>

            <div className="container mt-5">
                <h1 className="text-center mb-4">Add New Employee</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="jobTitle"
                                placeholder="Job Title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Save</button>
                </form>
                <hr />
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    Back to Employee List
                </button>
            </div>
        </div>
    );
};

export default AddEmployeeForm;

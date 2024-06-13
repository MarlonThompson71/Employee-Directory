// EmployeeForm.jsx
import React, { useState } from 'react';

const EmployeeForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const response = await fetch('/api/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, jobTitle }),
                });
                if (response.ok) {
                    // Reset form and validation
                    setFirstName('');
                    setLastName('');
                    setJobTitle('');
                    setValidated(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setValidated(true);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Employee Management System</h1>
            <hr />
            <h2>Save Employee</h2>
            <form onSubmit={handleSubmit} noValidate validated={validated}>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First Name"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <div className="invalid-feedback">Please provide a first name.</div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <div className="invalid-feedback">Please provide a last name.</div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="jobTitle"
                            placeholder="Job Title"
                            required
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                        <div className="invalid-feedback">Please provide a job title.</div>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
            <hr />
            <button className="btn btn-secondary" onClick={() => window.history.back()}>
                Back to Employee List
            </button>
        </div>
    );
};

export default EmployeeForm;

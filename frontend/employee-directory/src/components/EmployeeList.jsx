import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/Users/marlonthompson/Desktop/Employees copy 2/frontend/employee-directory/src/styles.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        const serverUrl = 'http://localhost:8080/';
        fetch(serverUrl, { method: 'GET' })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then(data => {
                setEmployees(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this employee?');

        if (confirmed) {
            fetch(`http://localhost:8080/api/employees/${id}`, { method: 'DELETE' })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to delete employee');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log('Employee deleted successfully:', data);
                    fetchEmployees(); // Refresh the employees list
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                })
                .finally(() => {
                    window.location.reload(); // Reload the page
                });
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredEmployees = employees.filter(employee =>
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">MarlonCorp</Link>
                    <Link to="/add" className="btn btn-primary ml-auto">Add new Employee</Link>
                </div>
            </nav>

            <div className="container mt-3">
                <h1 className="text-center mb-4">Employee Directory</h1>
                <div className="d-flex align-items-center mb-3">
                    <h5 className="mr-3">Filter Employees</h5>
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Name, Job Title... "
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>
                {error && <div className="alert alert-danger">Error: {error}</div>}
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Employee ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.jobTitle}</td>
                                <td>
                                    <Link to={`/updateform/${employee.id}`} className="btn btn-info btn-sm">Update</Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;

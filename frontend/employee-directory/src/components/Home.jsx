import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ employees }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(employees); // Initialize with employees

    const handleSearch = () => {
        const searchTermLC = searchTerm.toLowerCase();
        const filtered = employees.filter(
            employee =>
                employee.firstName.toLowerCase().includes(searchTermLC) ||
                employee.lastName.toLowerCase().includes(searchTermLC) ||
                employee.jobTitle.toLowerCase().includes(searchTermLC)
        );
        setFilteredEmployees(filtered);
    };

    useEffect(() => {
        // Update filteredEmployees when employees prop changes
        setFilteredEmployees(employees);
    }, [employees]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Search Employees</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by First Name, Last Name, or Job Title"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            {filteredEmployees.length > 0 ? (
                <div className="mt-3">
                    <h2>Search Results:</h2>
                    <ul className="list-group">
                        {filteredEmployees.map(employee => (
                            <li key={employee.id} className="list-group-item">
                                <Link to={`/employee/${employee.id}`}>
                                    {employee.firstName} {employee.lastName} - {employee.jobTitle}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default Home;

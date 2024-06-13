import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import UpdateEmployeeForm from './components/UpdateEmployeeForm';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<EmployeeList />} /> {/* Set the Home component as the root route */}
                    <Route path="/employee-list" element={<EmployeeList />} />
                    <Route path="/add" element={<AddEmployeeForm />} />
                    <Route path="/updateform/:id" element={<UpdateEmployeeForm />} />
                    <Route path="/update/:id" element={<UpdateEmployeeForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

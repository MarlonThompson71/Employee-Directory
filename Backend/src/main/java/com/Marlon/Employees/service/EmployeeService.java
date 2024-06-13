package com.Marlon.Employees.service;

import com.Marlon.Employees.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployee();

    Employee save(Employee employee);

    Employee getById(Integer id);

    void deleteById(Integer id);
}

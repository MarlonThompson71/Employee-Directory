package com.Marlon.Employees.service;

import com.Marlon.Employees.model.Employee;
import com.Marlon.Employees.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{
@Autowired

private EmployeeRepository employeeRepository;
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee save(Employee employee) {
        if(Objects.nonNull(employee))
employeeRepository.save(employee);
        return employee;
    }

    @Override
    public Employee getById(Integer id) {
            Employee employee = null;
        if(Objects.nonNull(id)){
            Optional<Employee> optionalEmployee = employeeRepository.findById(id);
            if(optionalEmployee.isPresent()){
            employee = optionalEmployee.get();
        }
    }else{
            throw new RuntimeException("Employee not found with the id"+ id);
        }
        return employee;
    }

    @Override
    public void deleteById(Integer id) {
        if(Objects.nonNull(id)){
            employeeRepository.deleteById(id);
        }

    }
}

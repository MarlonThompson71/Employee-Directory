package com.Marlon.Employees.controller;

import com.Marlon.Employees.model.Employee;
import com.Marlon.Employees.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // React frontend origin
@Controller
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    @ResponseBody
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployee();
    }

    @PostMapping("/api/employees/save")
    public String saveEmployee(@RequestBody Employee employee, RedirectAttributes redirectAttributes) {
        employeeService.save(employee);
        redirectAttributes.addFlashAttribute("message", "Employee saved successfully");
        return "redirect:/";
    }

    @GetMapping("/api/employees/{id}")
    @ResponseBody
    public Employee getEmployeeById(@PathVariable Integer id) {
        return employeeService.getById(id);
    }

    @PutMapping("/api/employees/{id}")
    @ResponseBody
    public Employee updateEmployee(@PathVariable Integer id, @RequestBody Employee employee) {
        employee.setId(id);
        return employeeService.save(employee);
    }

    @DeleteMapping("/api/employees/{id}")
    public String deleteEmployee(@PathVariable Integer id, RedirectAttributes redirectAttributes) {
        employeeService.deleteById(id);
        redirectAttributes.addFlashAttribute("message", "Employee deleted successfully");
        return "redirect:/";
    }
}

package com.example.springbootsrm;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    Employee newEmployee(@RequestBody Employee newEmployee) {
        return employeeRepository.save(newEmployee);
    }

    @GetMapping("/employee")
    List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/employee/{id}")
    Employee getEmployeeById(@PathVariable Integer id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @PutMapping("/employee/{id}")
    Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable Integer id) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setEmpName(newEmployee.getEmpName());
                    employee.setEmpSal(newEmployee.getEmpSal());
                    employee.setEmpDept(newEmployee.getEmpDept());
                    return employeeRepository.save(employee);
                }).orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @DeleteMapping("/employee/{id}")
    String deleteEmployee(@PathVariable Integer id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
        return "Employee with id " + id + " has been deleted successfully.";
    }
}

package com.example.springbootsrm;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    public List<Employee> getAllEmployees() {
        List<Employee> employees = new ArrayList<>();
        employeeRepository.findAll().forEach(employees::add);
        return employees;
    }

    public Employee getEmployeeById(int id) {
        return employeeRepository.findById(id).get();
    }

    public Employee saveOrUpdate(Employee employee) {
        return employeeRepository.save(employee);
    }
    public void delete(int id) {
        employeeRepository.deleteById(id);
    }
    public void update(Employee employee, int id) {
        employeeRepository.save(employee);
    }

}

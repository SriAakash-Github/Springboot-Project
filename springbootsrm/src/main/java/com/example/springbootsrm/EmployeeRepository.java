package com.example.springbootsrm;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {


}

package com.example.springbootsrm;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBOperationRunner implements CommandLineRunner {

    @Autowired
    EmployeeRepository eRepo;

    @Override
    public void run(String... args) throws Exception {

        eRepo.saveAll(Arrays.asList(
                new Employee("James", "2599.5", "HR"),
                new Employee("Elizabeth", "2999.0", "Admin"),
                new Employee("Robert", "2699.5", "Testing")
        ));

        System.out.println("-----All Data saved into Database------");
    }
}

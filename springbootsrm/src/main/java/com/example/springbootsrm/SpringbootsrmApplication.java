package com.example.springbootsrm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootsrmApplication {

	public static void main(String[] args) {
		System.out.println("Hello Start");
		SpringApplication.run(SpringbootsrmApplication.class, args);
		System.out.println("Hello end");
	}

}

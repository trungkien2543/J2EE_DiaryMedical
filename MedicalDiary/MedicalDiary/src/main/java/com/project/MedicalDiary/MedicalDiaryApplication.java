package com.project.MedicalDiary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MedicalDiaryApplication {

	public static void main(String[] args) {

		SpringApplication.run(MedicalDiaryApplication.class, args);
	}

}

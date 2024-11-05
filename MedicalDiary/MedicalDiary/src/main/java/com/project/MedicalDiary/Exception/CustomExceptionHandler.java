package com.project.MedicalDiary.Exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolation(ConstraintViolationException ex) {
        StringBuilder errors = new StringBuilder("Validation errors:\n");
        ex.getConstraintViolations().forEach(violation -> {
            errors.append(violation.getPropertyPath()).append(": ").append(violation.getMessage()).append("\n");
        });
        return new ResponseEntity<>(errors.toString(), HttpStatus.BAD_REQUEST);
    }
}

package org.example.backend.Exception;

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
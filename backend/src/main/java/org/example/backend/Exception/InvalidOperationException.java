package org.example.backend.Exception;

public class InvalidOperationException extends RuntimeException {
  public InvalidOperationException(String message) {
    super(message);
  }
}
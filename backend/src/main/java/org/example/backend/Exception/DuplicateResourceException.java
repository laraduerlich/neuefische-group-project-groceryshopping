package org.example.backend.Exception;

public class DuplicateResourceException extends RuntimeException {
  public DuplicateResourceException(String message) {
    super(message);
  }
}
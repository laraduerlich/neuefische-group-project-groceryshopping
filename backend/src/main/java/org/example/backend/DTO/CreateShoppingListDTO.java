package org.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateShoppingListDTO(
        @NotBlank @Size(min = 2, max = 100) String name //List name is obligatory
) {
}

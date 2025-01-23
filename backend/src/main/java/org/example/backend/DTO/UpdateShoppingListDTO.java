package org.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;

public record UpdateShoppingListDTO(
        @NotBlank String name           // New name for the shopping list
) {
}

package org.example.backend.DTO;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateShoppingListEntryDTO(
        @NotNull
        @Valid CreateItemDTO item, // Validate the nested item
        @NotNull
        @Size(min = 1, max = 100) Integer quantity // Validate quantity (must be at least 1)
) { }
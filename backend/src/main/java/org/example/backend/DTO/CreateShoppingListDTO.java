package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateShoppingListDTO(
        @NotBlank
        @Size(min = 2, max = 100) String name,          // Validate name is not blank and has a valid size
        @NotNull
        @Size(min = 1)                                  // Ensure at least one item exists in the list
        List<@Valid CreateShoppingListEntryDTO> list    // Validate each entry in the list
) { }

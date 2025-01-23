package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateShoppingListEntryDTO(
    @NotNull
    @Valid CreateItemDTO item, // Validate the nested item
    @NotNull
    @NotBlank String quantity
) { }
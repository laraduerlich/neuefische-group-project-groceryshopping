package org.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.backend.Model.Section;

public record CreateItemDTO(
        @NotBlank
        @Size(min = 2, max = 100) String name, // Validation for name
        @NotNull boolean checked,              // validation needed for boolean
        @NotNull Section section               // Ensure section is not null
) { }

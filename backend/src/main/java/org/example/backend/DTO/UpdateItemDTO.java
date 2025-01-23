package org.example.backend.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.example.backend.Model.Section;

public record UpdateItemDTO(
    String name,                  // Optional: No strict validation for now
    @NotBlank String quantity,
    Section section,
    Boolean checked
) {
}

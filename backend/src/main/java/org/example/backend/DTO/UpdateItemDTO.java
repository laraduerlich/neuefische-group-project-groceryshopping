package org.example.backend.DTO;

import jakarta.validation.constraints.Min;
import org.example.backend.Model.Section;

public record UpdateItemDTO(
        String name,                  // Optional: No strict validation for now
        @Min(1) Double quantity,
        Section section,
        Boolean checked
) {
}

package org.example.backend.DTO;

import jakarta.validation.constraints.Min;
import org.example.backend.Model.Section;
import org.example.backend.Model.Unit;

public record UpdateItemDTO(
        String name,                  // Optional: No strict validation for now
        @Min(1) Double quantity,
        Unit unit,
        Section section,
        Boolean checked
) {
}

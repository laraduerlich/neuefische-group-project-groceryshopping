package org.example.backend.DTO;

import jakarta.validation.constraints.Min;
import org.example.backend.Model.Category;
import org.example.backend.Model.Unit;

public record UpdateItemDTO(
        String name,                  // Optional: No strict validation for now
        @Min(1) Double quantity,
        Unit unit,
        Category category,
        Boolean checked
) {
}

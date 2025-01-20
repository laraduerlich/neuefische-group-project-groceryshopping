package org.example.backend.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.backend.Model.Section;

public record CreateItemDTO(
        @NotBlank @Size(min = 2, max = 100) String name,
        @Min(1) double quantity,
        // @NotBlank boolean checked, // not really sure if we need it
        @NotNull Section section
) {
}

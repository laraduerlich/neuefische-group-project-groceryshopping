package org.example.backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "items")
public record Item(
        @Id UUID id,
        String name,
        boolean checked,
        Section section
) { }



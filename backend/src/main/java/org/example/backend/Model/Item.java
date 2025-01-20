package org.example.backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
public record Item(
      @Id String _id,
        String name,
        boolean checked,
        Section section
) { }



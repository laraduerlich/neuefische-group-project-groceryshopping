package org.example.backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Items")
public record Item(
    @Id String id,
    String name,
    boolean checked,
    Section section
) { }





package org.example.backend.Model;
import org.springframework.data.annotation.Id;

public record Item(
    @Id String id,
    String name,
    boolean checked,
    Section section
) { }





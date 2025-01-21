package org.example.backend.Model;

import java.util.UUID;

public record Item(
    UUID id,
    String name,
    boolean checked,
    Section section
) { }





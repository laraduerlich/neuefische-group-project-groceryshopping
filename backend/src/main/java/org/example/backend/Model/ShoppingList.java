package org.example.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.UUID;

@Document(collection = "lists")
public record ShoppingList(
        @Id UUID id,
        String name,
        List<ShoppingListEntry> list
) { }

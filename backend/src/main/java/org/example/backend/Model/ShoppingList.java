package org.example.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.UUID;

@Document(collection = "ShoppingList")
public record ShoppingList(
      @Id String id,
        String name,
        List<ShoppingListEntry> list
) { }

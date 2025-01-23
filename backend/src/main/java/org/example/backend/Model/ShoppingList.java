package org.example.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "ShoppingList")
public record ShoppingList(
    @Id String id,                     // Matches the "_id" field
    String name,
    List<ShoppingListEntry> list       // List of ShoppingListEntry
) {}

package org.example.backend.Model;

public record ShoppingListEntry(
    Item item,  // Nested Item object
    int quantity
) { }



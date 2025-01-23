package org.example.backend.Model;

public record ShoppingListEntry(
    Item item,  // Nested Item object
    String quantity
) { }



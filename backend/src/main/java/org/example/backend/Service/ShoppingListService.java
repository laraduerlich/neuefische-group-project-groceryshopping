package org.example.backend.Service;

import org.example.backend.Model.ShoppingList;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShoppingListService {

    private final Map<UUID, ShoppingList> shoppingLists = new HashMap<>(); // In-Memory-Speicher

    // Erstellen einer neuen Einkaufsliste


    // Abrufen aller Einkaufslisten
    public List<ShoppingList> getAllShoppingLists() {
        return new ArrayList<>(shoppingLists.values());
    }
}

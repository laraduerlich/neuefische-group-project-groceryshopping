package org.example.backend.Service;

import org.example.backend.Model.ShoppingList;
import org.example.backend.Repo.ShoppingListRepo;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShoppingListService {

    private final ShoppingListRepo shoppingListRepo;

    public ShoppingListService(ShoppingListRepo shoppingListRepo) {
        this.shoppingListRepo = shoppingListRepo;
    }

    // Retrieve all shopping lists
    public List<ShoppingList> getAllShoppingLists() {
        return shoppingListRepo.findAll(); // MongoDB handles fetching with generated _id
    }
}


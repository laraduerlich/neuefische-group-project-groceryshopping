package org.example.backend.Controller;

import org.example.backend.Model.ShoppingList;
import org.example.backend.Service.ShoppingListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("api/shoppinglists")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }


    //        GET /api/shoppinglists → Retrieve all shopping lists
    @GetMapping
    public ResponseEntity<List<ShoppingList>> getAllShoppingLists() {
        List<ShoppingList> shoppingLists = shoppingListService.getAllShoppingLists();
        return ResponseEntity.ok(shoppingLists);
    }
}
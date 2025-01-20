package org.example.backend.Controller;

import org.example.backend.Model.Item;
import org.example.backend.Model.ShoppingList;
import org.example.backend.Service.ItemService;
import org.example.backend.Service.ShoppingListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;
    private final ItemService itemService;

    public ShoppingListController(ShoppingListService shoppingListService, ItemService itemService) { // Include ItemService
        this.shoppingListService = shoppingListService;
        this.itemService = itemService;
    }

    @GetMapping("/shoppinglists")
    public ResponseEntity<List<ShoppingList>> getAllShoppingLists() {
        return ResponseEntity.ok(shoppingListService.getAllShoppingLists());
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }
}

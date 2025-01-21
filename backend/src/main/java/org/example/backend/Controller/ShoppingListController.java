package org.example.backend.Controller;

import jakarta.validation.Valid;
import org.example.backend.DTO.CreateShoppingListDTO;
import org.example.backend.Model.ShoppingList;
import org.example.backend.Service.ShoppingListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoppinglists")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    @GetMapping
    public ResponseEntity<List<ShoppingList>> getAllShoppingLists() {
        return ResponseEntity.ok(shoppingListService.findAllShoppingLists());
    }

    @PostMapping
    public ResponseEntity<ShoppingList> addShoppingList(@RequestBody @Valid CreateShoppingListDTO createShoppingListDTO) {
        ShoppingList createdList = shoppingListService.createShoppingList(createShoppingListDTO);
        return ResponseEntity.status(201).body(createdList); // Use 201 Created
    }

    // Eine explizite Liste anhand der ID holen
    @GetMapping("/{id}")
    public ResponseEntity<ShoppingList> getShoppingListById(@PathVariable String id) {
        ShoppingList shoppingList = shoppingListService.findShoppingListById(id);
        if (shoppingList == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(shoppingList);
    }
}
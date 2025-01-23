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

    // 1. GET: Retrieve all ShoppingLists
    @GetMapping
    public ResponseEntity<List<ShoppingList>> getAllShoppingLists() {
        return ResponseEntity.ok(shoppingListService.findAllShoppingLists());
    }

    // 2. GET: Retrieve ShoppingList by id
    @GetMapping("/{id}")
    public ResponseEntity<ShoppingList> getShoppingListById(@PathVariable String id) {
        ShoppingList shoppingList = shoppingListService.findShoppingListById(id);
        return ResponseEntity.ok(shoppingList); // Exception handles null case
    }

    // 3. POST: Create a new Shopping List
    @PostMapping
    public ResponseEntity<ShoppingList> addShoppingList(@RequestBody @Valid CreateShoppingListDTO createShoppingListDTO) {
        ShoppingList createdList = shoppingListService.createShoppingList(createShoppingListDTO);
        return ResponseEntity.status(201).body(createdList); // HTTP 201 Created
    }

    // 4. PUT: Edit ShoppingList by id
    @PutMapping("/{id}")
    public ResponseEntity<ShoppingList> updateShoppingList(
        @PathVariable String id,
        @RequestBody @Valid CreateShoppingListDTO updateShoppingListDTO
        ) {
        ShoppingList updatedList = shoppingListService.updateShoppingList(id, updateShoppingListDTO);
        return ResponseEntity.ok(updatedList); // HTTP 200 OK
    }

    // 5. DELETE: Delete ShoppingList by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShoppingList(@PathVariable String id) {
        shoppingListService.deleteShoppingListById(id); // Throws exception if not found
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }
}

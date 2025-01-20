//package org.example.backend.Controller;
//
//import org.example.backend.Service.ShoppingListService;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/shoppinglists")
//public class Scratch {
//
//    public class ShoppingListController {
//
//        private final ShoppingListService shoppingListService;
//
//        public ShoppingListController(ShoppingListService shoppingListService) {
//            this.shoppingListService = shoppingListService;
//        }
//
//        // POST /api/shoppinglists → Create a new shopping list
//        @PostMapping
//        public ResponseEntity<ShoppingList> createShoppingList(@RequestBody ShoppingList shoppingList) {
//            ShoppingList createdList = shoppingListService.createShoppingList(shoppingList);
//            return ResponseEntity.ok(createdList);
//        }
//
//        // GET /api/shoppinglists → Retrieve all shopping lists
//        @GetMapping
//        public ResponseEntity<List<ShoppingList>> getAllShoppingLists() {
//            List<ShoppingList> shoppingLists = shoppingListService.getAllShoppingLists();
//            return ResponseEntity.ok(shoppingLists);
//        }
//
//        // GET /api/shoppinglists/{id} → Retrieve a specific shopping list by ID
//        @GetMapping("/{id}")
//        public ResponseEntity<ShoppingList> getShoppingListById(@PathVariable UUID id) {
//            ShoppingList shoppingList = shoppingListService.getShoppingListById(id);
//            return ResponseEntity.ok(shoppingList);
//        }
//
//        // PUT /api/shoppinglists/{id} → Update a shopping list
//        @PutMapping("/{id}")
//        public ResponseEntity<ShoppingList> updateShoppingList(@PathVariable UUID id, @RequestBody ShoppingList updatedList) {
//            ShoppingList shoppingList = shoppingListService.updateShoppingList(id, updatedList);
//            return ResponseEntity.ok(shoppingList);
//        }
//
//        // DELETE /api/shoppinglists/{id} → Delete a shopping list
//        @DeleteMapping("/{id}")
//        public ResponseEntity<Void> deleteShoppingList(@PathVariable UUID id) {
//            shoppingListService.deleteShoppingList(id);
//            return ResponseEntity.noContent().build();
//        }
//    }

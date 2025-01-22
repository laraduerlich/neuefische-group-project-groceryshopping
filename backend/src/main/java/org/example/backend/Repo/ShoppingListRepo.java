package org.example.backend.Repo;

import org.example.backend.Model.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingListRepo extends MongoRepository<ShoppingList, String> {
   // Custom query method to check if a shopping list with a specific name exists
   boolean existsByName(String name);
}

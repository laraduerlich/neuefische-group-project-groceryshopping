package org.example.backend.Repo;

import org.example.backend.Model.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingListRepo extends MongoRepository<ShoppingList, String> {
}

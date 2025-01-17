package org.example.backend.Repo;

import org.example.backend.Model.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.UUID;

public interface ShoppingListRepo extends MongoRepository<ShoppingList, UUID> {
}

package org.example.backend.Repo;

import org.example.backend.Model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.UUID;

public interface ItemRepo extends MongoRepository<Item, UUID> {
}

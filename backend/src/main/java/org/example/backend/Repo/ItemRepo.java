package org.example.backend.Repo;

import org.example.backend.Model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepo extends MongoRepository<Item, String> {
}

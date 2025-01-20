package org.example.backend.Service;

import org.example.backend.Model.Item;
import org.example.backend.Repo.ItemRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

   private final ItemRepo itemRepo;

   public ItemService(ItemRepo itemRepo) {
      this.itemRepo = itemRepo;
   }

   public List<Item> getAllItems() {
      List<Item> items = itemRepo.findAll();
      if (items.isEmpty()) {
         System.out.println("No items found in the database.");
      } else {
         System.out.println("Fetched items: " + items);
      }
      return items;
   }
}

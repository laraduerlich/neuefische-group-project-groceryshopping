package org.example.backend.Service;

import org.example.backend.Model.ShoppingList;
import org.example.backend.Repo.ShoppingListRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListService {

    private final ShoppingListRepo shoppingListRepo;
    private static final Logger logger = LoggerFactory.getLogger(ShoppingListService.class);

    public ShoppingListService(ShoppingListRepo shoppingListRepo) {
        this.shoppingListRepo = shoppingListRepo;
    }

    public List<ShoppingList> getAllShoppingLists() {
        List<ShoppingList> shoppingLists = shoppingListRepo.findAll();
        logger.info("Fetched shopping lists: {}", shoppingLists);
        return shoppingLists;
    }
}

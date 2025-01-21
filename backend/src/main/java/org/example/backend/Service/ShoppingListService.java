package org.example.backend.Service;

import org.example.backend.DTO.CreateShoppingListDTO;
import org.example.backend.DTO.CreateShoppingListEntryDTO;
import org.example.backend.Exception.ValidationException;
import org.example.backend.Model.Item;
import org.example.backend.Model.ShoppingList;
import org.example.backend.Model.ShoppingListEntry;
import org.example.backend.Repo.ShoppingListRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ShoppingListService {

    private final ShoppingListRepo shoppingListRepo;

    public ShoppingListService(ShoppingListRepo shoppingListRepo) {
        this.shoppingListRepo = shoppingListRepo;
    }

    // 1. Logic for GET: Retrieve all Shopping Lists
    public List<ShoppingList> findAllShoppingLists() {
        return shoppingListRepo.findAll(); // Retrieves all shopping lists from the database
    }

    // 2. Eine Liste anhand der ID holen
    public ShoppingList findShoppingListById(String id) {
        return shoppingListRepo.findById(id).orElse(null);  // Gibt null zurück, wenn keine Liste gefunden wurde
    }

    // 3. Logic for POST: Create a new Shopping List
    public ShoppingList createShoppingList(CreateShoppingListDTO createShoppingListDTO) {
        // Validate the input DTO
        validateShoppingListDTO(createShoppingListDTO);

        // Map the DTO to ShoppingList entries and generate UUIDs for items
        List<ShoppingListEntry> entries = createShoppingListDTO.list().stream()
                .map(entryDTO -> {
                    Item item = new Item(
                            UUID.randomUUID(), // Generate unique ID for each item
                            entryDTO.item().name(),
                            entryDTO.item().checked(),
                            entryDTO.item().section()
                    );
                    return new ShoppingListEntry(item, entryDTO.quantity());
                })
                .collect(Collectors.toList());

        // Create a ShoppingList entity
        ShoppingList shoppingList = new ShoppingList(
                null, // Let MongoDB generate the _id
                createShoppingListDTO.name(),
                entries
        );

        // Save the shopping list to the database
        return shoppingListRepo.save(shoppingList);
    }

        public boolean deleteShoppingListById(String id) {
            if (shoppingListRepo.existsById(id)) {
                shoppingListRepo.deleteById(id);
                return true;
            } else {
                return false; // Liste mit der ID existiert nicht
            }
        }

        // Validation logic for the CreateShoppingListDTO
        private void validateShoppingListDTO(CreateShoppingListDTO dto) {
            if (dto.name() == null || dto.name().isBlank()) {
                throw new ValidationException("Shopping list name cannot be blank.");
            }

            if (dto.list() == null || dto.list().isEmpty()) {
                throw new ValidationException("Shopping list must contain at least one item.");
            }

            for (CreateShoppingListEntryDTO entry : dto.list()) {
                if (entry.item() == null) {
                    throw new ValidationException("Each shopping list entry must have an item.");
                }
                if (entry.quantity() == null || entry.quantity() <= 0) {
                    throw new ValidationException("Quantity must be greater than 0.");
                }
                if (entry.item().name() == null || entry.item().name().isBlank()) {
                    throw new ValidationException("Item name cannot be blank.");
                }
                if (entry.item().section() == null) {
                    throw new ValidationException("Item section cannot be null.");
                }
            }
        }
    }
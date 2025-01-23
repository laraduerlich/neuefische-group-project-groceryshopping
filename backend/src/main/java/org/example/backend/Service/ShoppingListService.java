package org.example.backend.Service;

import org.example.backend.DTO.CreateShoppingListDTO;
import org.example.backend.DTO.CreateShoppingListEntryDTO;
import org.example.backend.Exception.DuplicateResourceException;
import org.example.backend.Exception.ResourceNotFoundException;
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

    // 1. Logic for GET: Retrieve all ShoppingLists
    public List<ShoppingList> findAllShoppingLists() {
        return shoppingListRepo.findAll(); // Retrieves all shopping lists from the database
    }

    // 2. Logic for GET: Retrieve ShoppingList by id
    public ShoppingList findShoppingListById(String id) {
        return shoppingListRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Shopping list with ID " + id + " not found."));
    }

    // 3. Logic for POST: Create a new Shopping List
    public ShoppingList createShoppingList(CreateShoppingListDTO createShoppingListDTO) {
        validateShoppingListDTO(createShoppingListDTO);

        // Check for duplicate shopping list name
        if (shoppingListRepo.existsByName(createShoppingListDTO.name())) {
            throw new DuplicateResourceException("Shopping list with name '" + createShoppingListDTO.name() + "' already exists.");
        }

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

        ShoppingList shoppingList = new ShoppingList(
            null, // Let MongoDB generate the _id
            createShoppingListDTO.name(),
            entries
        );

        return shoppingListRepo.save(shoppingList);
    }


    // 4. Logic for PUT: Edit ShoppingList by id
    public ShoppingList updateShoppingList(String id, CreateShoppingListDTO updateShoppingListDTO) {
        // Validate if the shopping list exists
        ShoppingList existingList = shoppingListRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Shopping list with ID " + id + " not found."));

        // Validate the incoming DTO
        validateShoppingListDTO(updateShoppingListDTO);

        // Map DTO to updated ShoppingList
        List<ShoppingListEntry> updatedEntries = updateShoppingListDTO.list().stream()
            .map(entryDTO -> new ShoppingListEntry(
                new Item(
                    UUID.randomUUID(), // Generate a new ID for each updated item
                    entryDTO.item().name(),
                    entryDTO.item().checked(),
                    entryDTO.item().section()
                ),
                entryDTO.quantity()
            ))
            .toList();

        // Update the existing shopping list's fields
        ShoppingList updatedList = new ShoppingList(
            existingList.id(), // Retain the original ID
            updateShoppingListDTO.name(), // Update the name
            updatedEntries // Update the items
        );

        // Save updated shopping list
        return shoppingListRepo.save(updatedList);
    }

    // 5. Logic for DELETE: Delete ShoppingList by id
    public void deleteShoppingListById(String id) {
        if (!shoppingListRepo.existsById(id)) {
            throw new ResourceNotFoundException("Shopping list with ID " + id + " not found.");
        }
        shoppingListRepo.deleteById(id);
    }

    // HELPER FUNCTION: Validation logic for the CreateShoppingListDTO
     void validateShoppingListDTO(CreateShoppingListDTO dto) {
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

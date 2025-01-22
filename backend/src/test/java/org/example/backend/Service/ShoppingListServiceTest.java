package org.example.backend.Service;

import org.example.backend.DTO.CreateItemDTO;
import org.example.backend.DTO.CreateShoppingListDTO;
import org.example.backend.DTO.CreateShoppingListEntryDTO;
import org.example.backend.Model.Item;
import org.example.backend.Model.Section;
import org.example.backend.Model.ShoppingList;
import org.example.backend.Model.ShoppingListEntry;
import org.example.backend.Repo.ShoppingListRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ShoppingListServiceTest {

   private ShoppingListRepo repo; // Mocked repository
   private ShoppingListService service; // Service being tested

   // Shared test data
   private List<ShoppingList> mockShoppingLists;
   private CreateShoppingListDTO mockCreateShoppingListDTO;

   @BeforeEach
   void setUp() {
      repo = mock(ShoppingListRepo.class);
      service = new ShoppingListService(repo);

      // Mock shopping lists
      mockShoppingLists = List.of(
          new ShoppingList(
              "678fabf9e82a503f8765371f",
              "Weekly Groceries",
              List.of(
                  new ShoppingListEntry(
                      new Item(UUID.fromString("afa8a75e-3e03-40e8-b794-e21ab60ccde0"), "Milk", false, Section.DAIRY),
                      2
                  ),
                  new ShoppingListEntry(
                      new Item(UUID.fromString("101f250e-eb5b-4324-be7e-f4e976426091"), "Bread", false, Section.BAKERY),
                      1
                  )
                     )
          )
                                 );

      // Mock CreateShoppingListDTO
      mockCreateShoppingListDTO = new CreateShoppingListDTO(
          "Weekly Groceries",
          List.of(
              new CreateShoppingListEntryDTO(
                  new CreateItemDTO("Milk", false, Section.DAIRY),
                  2
              ),
              new CreateShoppingListEntryDTO(
                  new CreateItemDTO("Bread", false, Section.BAKERY),
                  1
              )
                 )
      );
   }

   // ------------------- GET ALL SHOPPING LISTS -------------------
   @Test
   void findAllShoppingLists_shouldReturnEmptyList_WhenNoShoppingListsExist() {
      // Given
      when(repo.findAll()).thenReturn(Collections.emptyList());

      // When
      List<ShoppingList> result = service.findAllShoppingLists();

      // Then
      assertTrue(result.isEmpty(), "The list should be empty.");
      verify(repo, times(1)).findAll();
   }

   @Test
   void findAllShoppingLists_shouldReturnAllShoppingLists_WhenListsExist() {
      // Given
      when(repo.findAll()).thenReturn(mockShoppingLists);

      // When
      List<ShoppingList> result = service.findAllShoppingLists();

      // Then
      assertEquals(1, result.size(), "The number of shopping lists should match.");
      assertEquals(mockShoppingLists, result, "The returned lists should match the mock data.");
      verify(repo, times(1)).findAll();
   }

   // ------------------- GET SHOPPING LIST BY ID -------------------
   @Test
   void findShoppingListById_shouldReturnShoppingList_WhenIdExists() {
      // Given
      String id = "678fabf9e82a503f8765371f";
      when(repo.findById(id)).thenReturn(Optional.of(mockShoppingLists.get(0)));

      // When
      ShoppingList result = service.findShoppingListById(id);

      // Then
      assertNotNull(result, "The result should not be null.");
      assertEquals("Weekly Groceries", result.name(), "The name should match the expected shopping list.");
      verify(repo, times(1)).findById(id);
   }

   @Test
   void findShoppingListById_shouldThrowException_WhenIdDoesNotExist() {
      // Given
      String id = "non-existent-id";
      when(repo.findById(id)).thenReturn(Optional.empty());

      // When & Then
      Exception exception = assertThrows(RuntimeException.class, () -> service.findShoppingListById(id));
      assertEquals("Shopping list with ID " + id + " not found.", exception.getMessage());
      verify(repo, times(1)).findById(id);
   }

   // ------------------- CREATE SHOPPING LIST -------------------
   @Test
   void createShoppingList_shouldSaveAndReturnShoppingList() {
      // Given
      ShoppingList expected = new ShoppingList(
          "678fabf9e82a503f8765371f",
          mockCreateShoppingListDTO.name(),
          mockCreateShoppingListDTO.list().stream()
              .map(entry -> new ShoppingListEntry(
                  new Item(UUID.randomUUID(), entry.item().name(), entry.item().checked(), entry.item().section()),
                  entry.quantity()
              ))
              .toList()
      );

      when(repo.save(any(ShoppingList.class))).thenReturn(expected);

      // When
      ShoppingList result = service.createShoppingList(mockCreateShoppingListDTO);

      // Then
      assertNotNull(result, "The result should not be null.");
      assertEquals(expected.name(), result.name(), "The names should match.");
      verify(repo, times(1)).save(any(ShoppingList.class));
   }

   @Test
   void createShoppingList_shouldThrowValidationException_WhenNameIsBlank() {
      // Given
      CreateShoppingListDTO invalidDTO = new CreateShoppingListDTO(
          " ",
          mockCreateShoppingListDTO.list()
      );

      // When & Then
      Exception exception = assertThrows(RuntimeException.class, () -> service.createShoppingList(invalidDTO));
      assertEquals("Shopping list name cannot be blank.", exception.getMessage());
   }

   // ------------------- UPDATE SHOPPING LIST -------------------
   @Test
   void updateShoppingList_shouldUpdateAndReturnShoppingList_WhenIdExists() {
      // Given
      String id = "678fabf9e82a503f8765371f";
      ShoppingList existingList = mockShoppingLists.get(0);

      CreateShoppingListDTO updateDTO = new CreateShoppingListDTO(
          "Updated Groceries",
          List.of(
              new CreateShoppingListEntryDTO(
                  new CreateItemDTO("Eggs", false, Section.DAIRY),
                  12
              )
                 )
      );

      ShoppingList updatedList = new ShoppingList(
          id,
          updateDTO.name(),
          updateDTO.list().stream()
              .map(entry -> new ShoppingListEntry(
                  new Item(UUID.randomUUID(), entry.item().name(), entry.item().checked(), entry.item().section()),
                  entry.quantity()
              ))
              .toList()
      );

      when(repo.findById(id)).thenReturn(Optional.of(existingList));
      when(repo.save(any(ShoppingList.class))).thenReturn(updatedList);

      // When
      ShoppingList result = service.updateShoppingList(id, updateDTO);

      // Then
      assertEquals(updatedList.name(), result.name(), "Updated names should match.");
      verify(repo, times(1)).findById(id);
      verify(repo, times(1)).save(any(ShoppingList.class));
   }

   @Test
   void updateShoppingList_shouldThrowException_WhenIdDoesNotExist() {
      // Given
      String id = "non-existent-id";
      CreateShoppingListDTO updateDTO = new CreateShoppingListDTO("Updated Groceries", mockCreateShoppingListDTO.list());

      when(repo.findById(id)).thenReturn(Optional.empty());

      // When & Then
      Exception exception = assertThrows(RuntimeException.class, () -> service.updateShoppingList(id, updateDTO));
      assertEquals("Shopping list with ID " + id + " not found.", exception.getMessage());
      verify(repo, times(1)).findById(id);
   }

   // ------------------- DELETE SHOPPING LIST -------------------
   @Test
   void deleteShoppingListById_shouldDeleteShoppingList_WhenIdExists() {
      // Given
      String id = "678fabf9e82a503f8765371f";
      when(repo.existsById(id)).thenReturn(true);

      // When
      service.deleteShoppingListById(id);

      // Then
      verify(repo, times(1)).existsById(id);
      verify(repo, times(1)).deleteById(id);
   }

   @Test
   void deleteShoppingListById_shouldThrowException_WhenIdDoesNotExist() {
      // Given
      String id = "non-existent-id";
      when(repo.existsById(id)).thenReturn(false);

      // When & Then
      Exception exception = assertThrows(RuntimeException.class, () -> service.deleteShoppingListById(id));
      assertEquals("Shopping list with ID " + id + " not found.", exception.getMessage());
      verify(repo, times(1)).existsById(id);
      verify(repo, never()).deleteById(any());
   }
}

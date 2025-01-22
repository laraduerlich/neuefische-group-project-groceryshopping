package org.example.backend.Service;

import org.example.backend.Model.Item;
import org.example.backend.Model.Section;
import org.example.backend.Model.ShoppingList;
import org.example.backend.Model.ShoppingListEntry;
import org.example.backend.Repo.ShoppingListRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ShoppingListServiceTest {

   // Mock Repo
   private final ShoppingListRepo repo = mock(ShoppingListRepo.class);

   // Service we are testing:
   private final ShoppingListService service = new ShoppingListService(repo);

   @Test
   void findAllShoppingLists_shouldReturnEmptyList_WhenNoShoppingListsExist() {
      when(repo.findAll()).thenReturn(Collections.emptyList());
      List<ShoppingList> shoppingLists = service.findAllShoppingLists();
      assertTrue(shoppingLists.isEmpty(), "The list should be empty");
      Mockito.verify(repo, Mockito.times(1)).findAll();
   }

   @Test
   void findAllShoppingLists_shouldReturnAllShoppingLists_WhenListsExist() {
      // Given
      // Mock data setup
      List<ShoppingList> expected = List.of(
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
          ),
          new ShoppingList(
              "678faeb0ae3ae049b3e0032f",
              "Monthly Supplies",
              List.of(
                  new ShoppingListEntry(
                      new Item(UUID.fromString("b3c4386f-8882-4b29-ae12-9e1234c27a00"), "Pasta", true, Section.PANTRY),
                      3
                  ),
                  new ShoppingListEntry(
                      new Item(UUID.fromString("e2f9d7c3-51c7-4b1e-bcb7-6bd4a12fc4d7"), "Cheese", false, Section.DAIRY),
                      1
                  )
                     )
          )
                                           );
      when(repo.findAll()).thenReturn(expected);

      // When
      List<ShoppingList> result = service.findAllShoppingLists();

      // Then
      assertEquals(expected, result, "The returned shopping lists should match the expected ones.");
      Mockito.verify(repo, Mockito.times(1)).findAll();
   }


   @Test
   void createShoppingList () {
   }

   @Test
   void updateShoppingList () {
   }

   @Test
   void deleteShoppingListById () {
   }
}
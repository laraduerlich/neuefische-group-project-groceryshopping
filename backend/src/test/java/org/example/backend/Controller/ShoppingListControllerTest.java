package org.example.backend.Controller;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ShoppingListControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @Autowired
   private ShoppingListRepo shoppingListRepo;

   private List<ShoppingList> mockShoppingLists;
   private CreateShoppingListDTO mockCreateShoppingListDTO;

   @BeforeEach
   void setUp() {
      // Clear the database before each test
      shoppingListRepo.deleteAll();

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
   @DirtiesContext
   @Test
   void getAllShoppingLists_shouldReturnEmptyList_whenRepositoryIsEmpty() throws Exception {
      mockMvc.perform(get("/api/shoppinglists"))
          .andExpect(status().isOk())
          .andExpect(content().json("[]"));
   }

   // ------------------- GET SHOPPING LIST BY ID -------------------
   @Test
   void getShoppingListById_shouldReturnShoppingList_WhenIdExists() throws Exception {
      // Given
      ShoppingList savedList = shoppingListRepo.save(mockShoppingLists.get(0));

      // When & Then
      mockMvc.perform(get("/api/shoppinglists/{id}", savedList.id())
                          .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.id").value(savedList.id()))
          .andExpect(jsonPath("$.name").value(savedList.name()))
          .andExpect(jsonPath("$.list[0].item.name").value("Milk"))
          .andExpect(jsonPath("$.list[0].quantity").value(2));
   }

   @Test
   void getShoppingListById_shouldReturnNotFound_WhenIdDoesNotExist() throws Exception {
      mockMvc.perform(get("/api/shoppinglists/{id}", "non-existent-id")
                          .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isNotFound());
   }

   // ------------------- CREATE SHOPPING LIST -------------------
   @Test
   void addShoppingList_shouldCreateAndReturnShoppingList() throws Exception {
      mockMvc.perform(post("/api/shoppinglists")
                          .contentType(MediaType.APPLICATION_JSON)
                          .content("""
                        {
                          "name": "Weekly Groceries",
                          "list": [
                            {
                              "item": {
                                "name": "Milk",
                                "checked": false,
                                "section": "DAIRY"
                              },
                              "quantity": 2
                            },
                            {
                              "item": {
                                "name": "Bread",
                                "checked": false,
                                "section": "BAKERY"
                              },
                              "quantity": 1
                            }
                          ]
                        }
                        """))
          .andExpect(status().isCreated())
          .andExpect(jsonPath("$.name").value("Weekly Groceries"));
   }

   @Test
   void addShoppingList_shouldReturnBadRequest_WhenInputIsInvalid() throws Exception {
      mockMvc.perform(post("/api/shoppinglists")
                          .contentType(MediaType.APPLICATION_JSON)
                          .content("{}")) // Invalid JSON
          .andExpect(status().isBadRequest());
   }

   // ------------------- EDIT SHOPPING LIST -------------------
   @Test
   void updateShoppingList_shouldUpdateAndReturnShoppingList() throws Exception {
      // Given
      ShoppingList savedList = shoppingListRepo.save(mockShoppingLists.get(0));

      // When & Then
      mockMvc.perform(put("/api/shoppinglists/{id}", savedList.id())
                          .contentType(MediaType.APPLICATION_JSON)
                          .content("""
                        {
                          "name": "Updated Weekly Groceries",
                          "list": [
                            {
                              "item": {
                                "name": "Eggs",
                                "checked": false,
                                "section": "DAIRY"
                              },
                              "quantity": 12
                            }
                          ]
                        }
                        """))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.name").value("Updated Weekly Groceries"))
          .andExpect(jsonPath("$.list[0].item.name").value("Eggs"))
          .andExpect(jsonPath("$.list[0].quantity").value(12));
   }

   @Test
   void updateShoppingList_shouldReturnNotFound_WhenIdDoesNotExist() throws Exception {
      mockMvc.perform(put("/api/shoppinglists/{id}", "non-existent-id")
                          .contentType(MediaType.APPLICATION_JSON)
                          .content("""
                        {
                          "name": "Updated Weekly Groceries",
                          "list": [
                            {
                              "item": {
                                "name": "Eggs",
                                "checked": false,
                                "section": "DAIRY"
                              },
                              "quantity": 12
                            }
                          ]
                        }
                        """))
          .andExpect(status().isNotFound());
   }

   // ------------------- DELETE SHOPPING LIST -------------------
   @Test
   void deleteShoppingList_shouldDeleteShoppingList_WhenIdExists() throws Exception {
      // Given
      ShoppingList savedList = shoppingListRepo.save(mockShoppingLists.get(0));

      // When & Then
      mockMvc.perform(delete("/api/shoppinglists/{id}", savedList.id()))
          .andExpect(status().isNoContent());
   }

   @Test
   void deleteShoppingList_shouldReturnNotFound_WhenIdDoesNotExist() throws Exception {
      mockMvc.perform(delete("/api/shoppinglists/{id}", "non-existent-id"))
          .andExpect(status().isNotFound());
   }
}

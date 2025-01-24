package org.example.backend.Controller;

import com.jayway.jsonpath.JsonPath;
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
import org.springframework.security.test.context.support.WithMockUser;
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

   private CreateShoppingListDTO mockCreateShoppingListDTO;

   @BeforeEach
   void setUp() {
      // Clear the database before each test
      shoppingListRepo.deleteAll();

      // Mock CreateShoppingListDTO
      mockCreateShoppingListDTO = new CreateShoppingListDTO(
          "Weekly Groceries",
          List.of(
              new CreateShoppingListEntryDTO(
                  new CreateItemDTO("Milk", false, Section.DAIRY),
                  "2"
              ),
              new CreateShoppingListEntryDTO(
                  new CreateItemDTO("Bread", false, Section.BAKERY),
                  "1"
              )
          )
      );
   }


   // ------------------- Utility Methods -------------------

   private void saveMockShoppingList() {
      ShoppingList shoppingList = new ShoppingList(
          "678fabf9e82a503f8765371f", // Manually set the ID
          mockCreateShoppingListDTO.name(),
          mockCreateShoppingListDTO.list().stream()
              .map(entry -> new ShoppingListEntry(
                  new Item(
                      UUID.fromString("0dfaf07c-cc74-488d-b637-eb6600d2097b"), // Convert String to UUID
                      entry.item().name(),
                      entry.item().checked(),
                      entry.item().section()
                  ),
                  entry.quantity()
              ))
              .toList()
      );
      shoppingListRepo.save(shoppingList);
   }


   private String getMockCreateShoppingListPayload() {
      return """
            {
              "id": "678fabf9e82a503f8765371f",
              "name": "Weekly Groceries",
              "list": [
                {
                  "item": {
                    "id": "afa8a75e-3e03-40e8-b794-e21ab60ccde0",
                    "name": "Milk",
                    "checked": false,
                    "section": "DAIRY"
                  },
                  "quantity": "2"
                },
                {
                  "item": {
                    "id": "101f250e-eb5b-4324-be7e-f4e976426091",
                    "name": "Bread",
                    "checked": false,
                    "section": "BAKERY"
                  },
                  "quantity": "1"
                }
              ]
            }
            """;
   }

   // 1. ------------------- GET ALL SHOPPING LISTS -------------------

   @Test
   @WithMockUser
   void getAllShoppingLists_shouldReturnEmptyList_whenRepositoryIsEmpty() throws Exception {
      mockMvc.perform(get("/api/shoppinglists"))
          .andExpect(status().isOk())
          .andExpect(content().json("[]"));
   }

   @Test
   @WithMockUser
   void getAllShoppingLists_shouldReturnListOfShoppingLists_whenRepositoryHasData() throws Exception {
      saveMockShoppingList();

      mockMvc.perform(get("/api/shoppinglists"))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.length()").value(1))
          .andExpect(jsonPath("$[0].name").value("Weekly Groceries"));
   }

   // 2. ------------------- GET SHOPPING LIST BY ID -------------------

   @Test
   void getShoppingListById_shouldReturnShoppingList_WhenIdExists() throws Exception {
      saveMockShoppingList();
      ShoppingList savedList = shoppingListRepo.findAll().getFirst();

      mockMvc.perform(get("/api/shoppinglists/{id}", savedList.id())
                          .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.id").value(savedList.id()))
          .andExpect(jsonPath("$.name").value(savedList.name()))
          .andExpect(jsonPath("$.list[0].item.name").value("Milk"))
          .andExpect(jsonPath("$.list[0].quantity").value("2"));
   }

   @Test
   void getShoppingListById_shouldReturnNotFound_WhenIdDoesNotExist() throws Exception {
      mockMvc.perform(get("/api/shoppinglists/{id}", "non-existent-id")
             .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isNotFound());
   }

   // 3. ------------------- CREATE SHOPPING LIST -------------------

   @Test
   @WithMockUser
   void addShoppingList_shouldCreateAndReturnShoppingList() throws Exception {
      String response = mockMvc.perform(post("/api/shoppinglists")
                                            .contentType(MediaType.APPLICATION_JSON)
                                            .content(getMockCreateShoppingListPayload()))
          .andExpect(status().isCreated())
          .andReturn().getResponse().getContentAsString();

      // Parse the response to extract the generated ID
      String generatedId = JsonPath.parse(response).read("$.id");

      // Use the generated ID for further assertions
      mockMvc.perform(get("/api/shoppinglists/{id}", generatedId))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.id").value(generatedId))
          .andExpect(jsonPath("$.name").value("Weekly Groceries"));
   }


   @Test
   @WithMockUser
   void addShoppingList_shouldReturnBadRequest_WhenInputIsInvalid() throws Exception {
      mockMvc.perform(post("/api/shoppinglists")
                          .contentType(MediaType.APPLICATION_JSON)
                          .content("{}"))
          .andExpect(status().isBadRequest());
   }

   // 4. ------------------- EDIT SHOPPING LIST -------------------

   @Test
   void updateShoppingList_shouldUpdateAndReturnShoppingList() throws Exception {
      saveMockShoppingList();
      ShoppingList savedList = shoppingListRepo.findAll().get(0);

      mockMvc.perform(put("/api/shoppinglists/{id}", savedList.id())
                          .contentType(MediaType.APPLICATION_JSON)
                          .content("""
                {
                  "id": "678fabf9e82a503f8765371f",
                  "name": "Updated Weekly Groceries",
                  "list": [
                    {
                      "item": {
                        "id": "5e5bd3e2-4d1f-4679-8c24-2c839d3c4921",
                        "name": "Eggs",
                        "checked": false,
                        "section": "DAIRY"
                      },
                      "quantity": "12"
                    }
                  ]
                }
                """))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.id").value("678fabf9e82a503f8765371f"))
          .andExpect(jsonPath("$.name").value("Updated Weekly Groceries"))
          .andExpect(jsonPath("$.list[0].item.name").value("Eggs"))
          .andExpect(jsonPath("$.list[0].quantity").value("12"));
   }


   @Test
   void updateShoppingList_shouldReturnNotFound_WhenIdDoesNotExist() throws Exception {
      mockMvc.perform(put("/api/shoppinglists/{id}", "non-existent-id")
                          .contentType(MediaType.APPLICATION_JSON)
                          .content("""
                    {
                      "id": "678fabf9e82a503f8765371f",
                      "name": "Updated Weekly Groceries",
                      "list": [
                        {
                          "item": {
                            "name": "Eggs",
                            "checked": false,
                            "section": "DAIRY"
                          },
                          "quantity": "12"
                        }
                      ]
                    }
                    """))
          .andExpect(status().isNotFound());
   }

   // 5. ------------------- DELETE SHOPPING LIST -------------------

   @Test
   void deleteShoppingList_shouldDeleteShoppingList_WhenIdExists() throws Exception {
      saveMockShoppingList();
      ShoppingList savedList = shoppingListRepo.findAll().get(0);

      mockMvc.perform(delete("/api/shoppinglists/{id}", savedList.id()))
          .andExpect(status().isNoContent());
   }

   @Test
   void deleteShoppingList_shouldReturnNotFound_WhenIdDoesNotExist() throws Exception {
      mockMvc.perform(delete("/api/shoppinglists/{id}", "non-existent-id"))
          .andExpect(status().isNotFound());
   }
}

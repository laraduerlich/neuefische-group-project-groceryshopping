package org.example.backend.Controller;

import org.example.backend.DTO.CreateItemDTO;
import org.example.backend.DTO.CreateShoppingListDTO;
import org.example.backend.DTO.CreateShoppingListEntryDTO;
import org.example.backend.Model.Item;
import org.example.backend.Model.Section;
import org.example.backend.Model.ShoppingList;
import org.example.backend.Model.ShoppingListEntry;
import org.example.backend.Repo.ShoppingListRepo;
import org.example.backend.Service.ShoppingListService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class ShoppingListControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @Autowired
   private ShoppingListRepo shoppingListRepo;

   private List<ShoppingList> mockShoppingLists;
   private CreateShoppingListDTO mockCreateShoppingListDTO;

   void setUp () {
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
          ));

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
      void getAllShoppingLists () {
      }

      // ------------------- GET SHOPPING LIST BY ID -------------------
      @Test
      void getShoppingListById () {
      }

      // ------------------- CREATE SHOPPING LIST -------------------
      @Test
      void addShoppingList () {
      }

   // ------------------- EDIT SHOPPING LIST -------------------
      @Test
      void updateShoppingList () {
      }

   // ------------------- DELETE SHOPPING LIST -------------------
      @Test
      void deleteShoppingList () {
      }
   }

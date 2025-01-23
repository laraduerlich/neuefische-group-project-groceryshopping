export enum Section {
    FRUIT = "fruit",
    VEGETABLES = "vegetables",
    DAIRY = "dairy",
    MEAT = "meat",
    BAKERY = "bakery",
    BEVERAGES = "beverages",
    FROZEN = "frozen",
    SNACKS = "snacks",
    PANTRY = "pantry",
    HOUSEHOLD = "household",
    PERSONAL_CARE = "personal care",
    OTHER = "other", // Ensure "other" is part of the enum
}

// Item type matches the backend's Item model
export type Item = {
    id?: string; // UUID from the backend
    name: string;
    checked?: boolean;
    section: Section; // Section is now strongly typed
};

// ShoppingListEntry type matches the backend's ShoppingListEntry model
export type ShoppingListEntry = {
    item: Item; // Nested Item type
    quantity: string; // Quantity of the item
};

// ShoppingList type matches the backend's ShoppingList model
export type ShoppingList = {
    id?: string; // MongoDB `_id` field
    name: string; // Name of the shopping list
    list: ShoppingListEntry[]; // Array of entries in the list
};

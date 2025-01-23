import { ShoppingList } from '../type/Types.ts';

export const mockShoppingLists: ShoppingList[] = [
    {
        id: "678fabf9e82a503f8765371f",
        name: "Weekly Groceries",
        list: [
            {
                item: {
                    id: "afa8a75e-3e03-40e8-b794-e21ab60ccde0",
                    name: "Milk",
                    checked: false,
                    section: "DAIRY"
                },
                quantity: 2
            },
            {
                item: {
                    id: "101f250e-eb5b-4324-be7e-f4e976426091",
                    name: "Bread",
                    checked: false,
                    section: "BAKERY"
                },
                quantity: 1
            }
        ]
    },
    {
        id: "6790ca60f5061311aa5e6c7a",
        name: "Altans Groceries",
        list: [
            {
                item: {
                    id: "7d522fc4-9673-40a9-85b5-ae76cc3b3c3c",
                    name: "Tee",
                    checked: true,
                    section: "PANTRY"
                },
                quantity: 4
            }
        ]
    }
];

export const mockShoppingListById: ShoppingList = {
    id: "678fabf9e82a503f8765371f",
    name: "Weekly Groceries",
    list: [
        {
            item: {
                id: "afa8a75e-3e03-40e8-b794-e21ab60ccde0",
                name: "Milk",
                checked: false,
                section: "DAIRY"
            },
            quantity: 2
        }
    ]
};

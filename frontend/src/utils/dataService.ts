import axios from 'axios';
import { mockShoppingLists, mockShoppingListById } from '../assets/mockData.ts';
import { ShoppingList } from '../type/Types.ts';

// Fallback data cleaning/processing
const processList = (list: ShoppingList): ShoppingList => ({
    ...list,
    name: list.name || "Unnamed List",
    list: list.list.map(item => ({
        ...item,
        quantity: item.quantity || 1,
        item: {
            ...item.item,
            name: item.item.name || "Unnamed Item",
            section: item.item.section || "OTHER"
        }
    }))
});

// Get all shopping lists
export const getAllShoppingLists = async (): Promise<ShoppingList[]> => {
    try {
        // Uncomment the real API call when the backend is ready
        // const response = await axios.get('/api/shoppinglists');
        // const data: ShoppingList[] = response.data;

        // Temporary use of mock data
        const data: ShoppingList[] = mockShoppingLists;

        return data.map(processList);
    } catch (error) {
        console.error('Error fetching shopping lists:', error);
        throw error;
    }
};

// Get shopping list by ID
export const getShoppingListById = async (id: string): Promise<ShoppingList> => {
    try {
        // Uncomment the real API call when the backend is ready
        // const response = await axios.get(`/api/shoppinglists/${id}`);
        // const data: ShoppingList = response.data;

        // Temporary use of mock data
        const data: ShoppingList = mockShoppingListById;

        return processList(data);
    } catch (error) {
        console.error(`Error fetching shopping list with ID ${id}:`, error);
        throw error;
    }
};

// Delete shopping list by ID
export const deleteShoppingListById = async (id: string): Promise<void> => {
    try {
        // Uncomment the real API call when the backend is ready
        // await axios.delete(`/api/shoppinglists/${id}`);

        // Simulate delete in mock data (temporary)
        const index = mockShoppingLists.findIndex(list => list.id === id);
        if (index !== -1) {
            mockShoppingLists.splice(index, 1);
        }
    } catch (error) {
        console.error(`Error deleting shopping list with ID ${id}:`, error);
        throw error;
    }
};

// Edit shopping list by ID
export const editShoppingListById = async (id: string, updatedList: Omit<ShoppingList, 'id'>): Promise<ShoppingList> => {
    try {
        // Uncomment the real API call when the backend is ready
        // const response = await axios.put(`/api/shoppinglists/${id}`, updatedList);
        // const data: ShoppingList = response.data;
        // return processList(data);

        // Simulate edit in mock data (temporary)
        const index = mockShoppingLists.findIndex(list => list.id === id);
        if (index !== -1) {
            const updatedListWithId = { ...updatedList, id }; // Add back the ID for the mock data
            mockShoppingLists[index] = processList(updatedListWithId);
            return mockShoppingLists[index];
        }
        throw new Error(`List with ID ${id} not found.`);
    } catch (error) {
        console.error(`Error editing shopping list with ID ${id}:`, error);
        throw error;
    }
};

// Create new shopping list
export const createShoppingList = async (newList: Omit<ShoppingList, 'id'>): Promise<ShoppingList> => {
    try {
        // Uncomment the real API call when the backend is ready
        // const response = await axios.post('//api/shoppinglists', newList);
        // const data: ShoppingList = response.data;
        // return processList(data);

        // Simulate creation in mock data (temporary)
        const createdList = processList({ ...newList, id: `${Date.now()}` }); // Generate a fake ID for mock data
        mockShoppingLists.push(createdList);
        return createdList;
    } catch (error) {
        console.error('Error creating shopping list:', error);
        throw error;
    }
};

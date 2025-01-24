import ItemForm from "../components/ItemForm.tsx";
import {useEffect, useState} from "react";
import GroupedItems from "../components/GroupedItems.tsx";
import {useNavigate} from "react-router-dom";
import {createShoppingList} from "../utils/dataService.ts";
import {ShoppingList, Item} from "../type/Types.ts";
import {Loader} from "../components/Loader.tsx";

export default function CreateShoppingListPage(){

    const [items, setItems] = useState<{item: Item, quantity: string}[]>([]);

    const [shoppingListName, setShoppingListName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [listId, setListId] = useState<string | undefined>("")
    const [error, setError] = useState<string | null>(null);


    const navigate = useNavigate();

    const postApiCall = async (): Promise<string | undefined> => {
        const newList: Omit<ShoppingList, "id"> = {
            name: shoppingListName,
            list: items,
        };
        console.log("Sending new list to backend:", JSON.stringify(newList, null, 2));

        try {
            setIsLoading(true);

            // Create a promise for the minimum timeout
            const delay = new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay

            // Create a promise for the API call
            const apiCall = createShoppingList(newList);

            // Wait for both the delay and the API call to complete
            const [createdList] = await Promise.all([apiCall, delay]);

            setListId(createdList.id); // Update state with the new list ID
            return createdList.id; // Return the new list ID
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError(errorMessage);
            console.error("Error creating shopping list:", errorMessage);
            return undefined; // Return undefined in case of an error
        } finally {
            setIsLoading(false);
        }
    };


    const handleGoShoppingButtonClick = async () => {
        const id = await postApiCall();
        if (id) {
            navigate("/shopping/" + id);
        } else {
            console.error("Failed to create shopping list. Navigation aborted.");
        }
    };

    const handleSaveAndGoHomeButtonClick = async () => {
        const id = await postApiCall();
        if (id) {
            console.log("Shopping list created with ID:", id);
        } else {
            console.error("Failed to create shopping list. Proceeding to home.");
        }
        navigate("/");
    };

    const handleSubmitNewItem = (item: Item, quantity: string) => {
        const newItems = [...items, { item, quantity }];
        setItems(newItems);
    };

    useEffect(() => {

    }, []);

    return (
        <div className="shopping-list-page relative">
            {isLoading && <Loader />}
        <div className="shopping-list-page">
            <div className="relative rounded-md border border-gray-300">
                <input type="text"
                       id="shoppingListName"
                       name="shoppingListName"
                       value={shoppingListName}
                       onChange={(e) => setShoppingListName(e.target.value)} required
                       placeholder="Shopping List Name"
                       className="w-full py-2 pl-3 text-sm rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-blue-600"/>
            </div>
            <ItemForm onSubmit={handleSubmitNewItem}
            />
            <GroupedItems items={items} checkbox={false}/>
            <div className="flex justify-center">
                <button
                    onClick={() => handleSaveAndGoHomeButtonClick()}
                    disabled={isLoading || !shoppingListName || items.length === 0} // Disabled if loading, no name, or no items
                    className={`px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                        isLoading || !shoppingListName || items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Save and go 🏠
                </button>
                <button
                    onClick={() => handleGoShoppingButtonClick()}
                    disabled={isLoading || !shoppingListName || items.length === 0} // Disabled if loading, no name, or no items
                    className={`ml-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                        isLoading || !shoppingListName || items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Save and go 🛒
                </button>
            </div>
        </div>
        </div>
    );

}

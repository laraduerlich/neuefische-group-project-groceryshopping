import ItemForm from "../components/ItemForm.tsx";
import {useEffect, useState} from "react";
import GroupedItems from "../components/GroupedItems.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getShoppingListById, editShoppingListById } from "../utils/dataService.ts";
import {ShoppingList, Item} from "../type/Types.ts";
import {Loader} from "../components/Loader.tsx";

export default function EditShoppingListPage(){

    const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null); // Updated to hold the entire ShoppingList
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    // Get ListId from the params for the getListById request
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getShoppingListById(id)
                .then((data: ShoppingList) => {
                    setShoppingList(data); // Store the entire shopping list
                })
                .catch((error) => {
                    console.error("Error fetching shopping list:", error);
                    setError("Failed to fetch shopping list. Please try again.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    const putApiCall = async (): Promise<string | undefined> => {
        if (!shoppingList) return;

        try {
            setIsLoading(true);
            const updatedList = await editShoppingListById(shoppingList.id!, shoppingList); // Update backend
            return updatedList.id;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError(`Error updating shopping list: ${errorMessage}`);
            console.error(errorMessage);
            return undefined;
        } finally {
            setIsLoading(false);
        }
    };


    const handleGoShoppingButtonClick = async () => {
        const id = await putApiCall();
        if (id) {
            navigate("/shopping/" + id);
        } else {
            console.error("Failed to create shopping list. Navigation aborted.");
        }
    };

    const handleSaveAndGoHomeButtonClick = async () => {
        const listId = await putApiCall();
        if (listId) {
            console.log("Shopping list updated with ID:", listId);
        } else {
            console.error("Failed to update shopping list. Proceeding to home.");
        }
        navigate("/");
    };

    const handleSubmitNewItem = (item: Item, quantity: string) => {
        if (!shoppingList) return;

        const updatedList = {
            ...shoppingList,
            list: [...shoppingList.list, { item, quantity }], // Append the new item to the list
        };
        setShoppingList(updatedList);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!shoppingList) return;

        const updatedList = { ...shoppingList, name: e.target.value }; // Update the name of the shopping list
        setShoppingList(updatedList);
        setError(null);
    };

    if (isLoading || !shoppingList) {
        return <Loader />;
    }


    return (
        <div className="shopping-list-page relative">
            {error && <p className="text-red-500">{error}</p>}
            <div className="shopping-list-page">
                <div className="relative rounded-md border border-gray-300">
                    <input
                        type="text"
                        id="shoppingListName"
                        name="shoppingListName"
                        value={shoppingList.name}
                        onChange={handleNameChange}
                        required
                        placeholder="Shopping List Name"
                        className="w-full py-2 pl-3 text-sm rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-blue-600"
                    />
                </div>
                <ItemForm onSubmit={handleSubmitNewItem} />
                <GroupedItems items={shoppingList.list} checkbox={false} />
                <div className="flex justify-center">
                    <button
                        onClick={handleSaveAndGoHomeButtonClick}
                        disabled={isLoading || !shoppingList.name || shoppingList.list.length === 0}
                        className={`px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                            isLoading || !shoppingList.name || shoppingList.list.length === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Save and go 🏠
                    </button>
                    <button
                        onClick={handleGoShoppingButtonClick}
                        disabled={isLoading || !shoppingList.name || shoppingList.list.length === 0}
                        className={`ml-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                            isLoading || !shoppingList.name || shoppingList.list.length === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Save and go 🛒
                    </button>
                </div>
            </div>
        </div>
    );
}

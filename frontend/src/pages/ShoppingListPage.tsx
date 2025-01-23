import ItemForm from "../components/ItemForm.tsx";
import {useEffect, useState} from "react";
import GroupedItems from "../components/GroupedItems.tsx";
import {useNavigate} from "react-router-dom";
import {createShoppingList} from "../utils/dataService.ts";
import {ShoppingList, Item} from "../type/Types.ts";

export default function ShoppingListPage(){

    const [items, setItems] = useState<{item: Item, quantity: string}[]>([]);

    const [shoppingListName, setShoppingListName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [listId, setListId] = useState<string | undefined>("")
    const [error, setError] = useState<string | null>(null);


    const navigate = useNavigate();

    const postApiCall: () => Promise<void> = async () => {
        const newList: ShoppingList = {
            name: shoppingListName,
            list: items
        }
        try {
            setIsLoading(true);
            const createdList = await createShoppingList(newList)
            setListId(createdList.id);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
        console.log(isLoading)
        console.log(listId)
        console.log(error)
    }

    const handleGoShoppingButtonClick = () => {
       const id = postApiCall
        navigate("/shopping/" + id)
    };

    const handleSaveAndGoHomeButtonClick = () => {
        const id = postApiCall
        console.log(id)
        navigate("/")
    };

    const handleSubmitNewItem = (item: Item, quantity: string) => {
        setItems([...items, {item, quantity}]);
    };

    useEffect(() => {
        console.log(items);
    }, [items]);  // every time the state of items change, the items will be logged

    return (
        <div className="shopping-list-page">
            Shopping List Page
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
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Save and go 🏠
            </button>
            <button
                onClick={() => handleGoShoppingButtonClick()}
                className="ml-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Save and go 🛒
            </button>
            </div>
        </div>
    );

}

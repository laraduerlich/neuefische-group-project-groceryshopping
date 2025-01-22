import ItemForm from "../components/ItemForm.tsx";
import {Item} from "../type/Item.tsx";
import {useState} from "react";
import GroupedItems from "../components/GroupedItems.tsx";
import {useNavigate} from "react-router-dom";

export default function ShoppingListPage(){

    const [items, setItems] = useState<{item: Item, quantity: string}[]>([]);

    const [shoppingListName, setShoppingListName] = useState("");

    const handleGoShoppingButtonClick = () => {
        const id: string = ""  // Get this from the POST API call
        navigate("/shopping/" + id)
    };

    const handleSaveAndGoHomeButtonClick = () => {
        // Add POST API call here
        navigate("/")
    };

    const navigate = useNavigate();

    const handleSubmitNewItem = (item: Item, quantity: string) => {
        setItems([...items, {item, quantity}]);
        console.log(items);
    };

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

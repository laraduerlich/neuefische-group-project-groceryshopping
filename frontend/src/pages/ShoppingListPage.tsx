import ItemForm from "../components/ItemForm.tsx";
import {Item} from "../type/Item.tsx";
import {useState} from "react";
import GroupedItems from "../components/GroupedItems.tsx";
import {useNavigate} from "react-router-dom";

export default function ShoppingListPage(){

    const [items, setItems] = useState<{item: Item, quantity: string}[]>([]);

    const handleGoShoppingButtonClick = () => {
        const id: string = ""  // Get this from the POST API call
        navigate("/shopping/" + id)
    };

    const navigate = useNavigate();

    const handleSubmitNewItem = (item: Item, quantity: string) => {
        setItems([...items, {item, quantity}]);
        console.log(items);
    };

    return (
        <div className="shopping-list-page">
            Shopping List Page
            <ItemForm onSubmit={handleSubmitNewItem}
            />
            <GroupedItems items={items} checkbox={false}/>
            <button
                onClick={() => handleGoShoppingButtonClick()}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Save and go 🛒
            </button>
        </div>
    );

}

import ItemForm from "../components/ItemForm.tsx";
import {Item} from "../type/Item.tsx";
import {useState} from "react";

export default function ShoppingListPage(){

    const [items, setItems] = useState<{item: Item, quantity: string}[]>([]);

    const handleSubmitNewItem = (item: Item, quantity: string) => {

        setItems([...items, {item, quantity}]);
        console.log(items);
    };

    return (
        <div className="shopping-list-page">
            Shopping List Page
            <ItemForm onSubmit={handleSubmitNewItem}
            />
        </div>
    );

}

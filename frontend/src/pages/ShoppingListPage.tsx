import ItemForm from "../components/ItemForm.tsx";
import {useState} from "react";
import {Item} from "../type/Item.tsx";

export default function ShoppingListPage(){

    const [newItem, setNewItem] = useState<Item>({ name: "", sector: "" })
    const [newQuantity, setNewQuantity] = useState("")

    const handleItemChange = (newItem: Item) => {
        setNewItem(newItem);
    };

    const handleQuantityChange = (newQuantity: string) => {
        setNewQuantity(newQuantity);
    };

    const handleSubmit = (item: Item, quantity: string) => {
        console.log("Form submitted:", item, quantity);
        // Hier können Sie die Daten weiterverarbeiten, z. B. an einen Server senden
    };

    return (
        <div className="shopping-list-page">
            Shopping List Page
            <ItemForm
                addItem={newItem}
                quantity={newQuantity}
                onChange={handleItemChange}
                onQuantityChange={handleQuantityChange}
                onSubmit={handleSubmit} // onSubmit-Handler übergeben
            />
        </div>
    )

}

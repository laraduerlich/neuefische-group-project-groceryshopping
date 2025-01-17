import ItemForm from "../components/ItemForm.tsx";
import {Item} from "../type/Item.tsx";

export default function ShoppingListPage(){

    const handleSubmit = (item: Item, quantity: string) => {
        console.log("Form submitted:", item, quantity);
        // Hier können Sie die Daten weiterverarbeiten, z. B. an einen Server senden
    };

    return (
        <div className="shopping-list-page">
            Shopping List Page
            <ItemForm onSubmit={handleSubmit} // onSubmit-Handler übergeben
            />
        </div>
    )

}

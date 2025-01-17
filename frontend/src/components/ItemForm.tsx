import {Item} from "../type/Item.tsx";
import {ChangeEvent, FormEvent} from "react";

type ItemFormProps = {
    addItem: Item;
    quantity: string;
    onChange?: (item: Item) => void;
    onQuantityChange?: (quantity: string) => void;
    onSubmit?: (item: Item, quantity: string) => void
}

export default function ItemForm({addItem, quantity, onChange, onQuantityChange, onSubmit}: ItemFormProps){

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.({ ...addItem, name: event.target.value });
    };

    const handleSectorChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.({ ...addItem, sector: event.target.value });
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        onQuantityChange?.(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        onSubmit?.(addItem, quantity); // Ruft den onSubmit-Handler auf
    };

    return (
        <>
           <h2>Add a new item:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                       id="name"
                       name="name"
                       value={addItem.name}
                       onChange={handleNameChange} />
                <label htmlFor="quantity">Quantity:</label>
                <input type="text"
                       id="quantity"
                       name="quantity"
                       value={quantity}
                       onChange={handleQuantityChange} />
                <label htmlFor="sector">Sector:</label>
                <input id="sector"
                       name="sector"
                       value={addItem.sector}
                       onChange={handleSectorChange} />
                <button>Add</button>
            </form>

        </>
    )
}

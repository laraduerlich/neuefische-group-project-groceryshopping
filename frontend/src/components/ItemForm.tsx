import {Item} from "../type/Item.tsx";
import {FormEvent, useState} from "react";

type ItemFormProps = {
    onSubmit?: (item: Item, quantity: string) => void
}

export default function ItemForm({onSubmit}: ItemFormProps){

    const [name, setName] = useState("");
    const [sector, setSector] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        onSubmit?.({name, sector}, quantity); // Ruft den onSubmit-Handler auf
    };

    return (
        <>
           <h2>Add a new item:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                       id="name"
                       name="name"
                       value={name}
                       onChange={(e) => setName(e.target.value)} />
                <label htmlFor="quantity">Quantity:</label>
                <input type="text"
                       id="quantity"
                       name="quantity"
                       value={quantity}
                       onChange={(e) => setQuantity(e.target.value)}  />
                <label htmlFor="sector">Sector:</label>
                <input id="sector"
                       name="sector"
                       value={sector}
                       onChange={(e) => setSector(e.target.value)} />
                <button>Add</button>
            </form>

        </>
    )
}

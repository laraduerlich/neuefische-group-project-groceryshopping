import {Item, Section} from "../type/Item.tsx";
import {FormEvent, useState} from "react";

type ItemFormProps = {
    onSubmit?: (item: Item, quantity: string) => void
}

export default function ItemForm({onSubmit}: ItemFormProps){

    const [name, setName] = useState("");
    const [section, setSection] = useState<Section>("other");
    const [quantity, setQuantity] = useState("0");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        onSubmit?.({name, section}, quantity); // Ruft den onSubmit-Handler auf
        setName("");
        setSection("other");
        setQuantity("0");
    };

    const sections: Section[] = ["fruit", "vegetable", "dairy", "meat", "bakery", "beverages", "frozen", "snacks", "pantry", "household", "personal care", "other"];

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
                <select id="sector"
                       name="sector"
                       value={section}
                       onChange={(e) => setSection(e.target.value as Section)}>
                        {sections.map((section, index) => (<option key={index} value={section}>{section}</option>))}
                </select>
                <button>Add</button>
            </form>

        </>
    )
}

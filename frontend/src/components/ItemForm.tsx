import {Item, Section} from "../type/Item.tsx";
import {FormEvent, useState} from "react";

type ItemFormProps = {
    onSubmit?: (item: Item, quantity: string) => void
}

export default function ItemForm({onSubmit}: ItemFormProps){

    const [name, setName] = useState("");
    const [section, setSection] = useState<Section | null>(null);
    const [quantity, setQuantity] = useState("1");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        if (!section) {
            alert("Please select a section."); // Prompt user to select an option
            return;
        }
        onSubmit?.({name, section}, quantity); // Ruft den onSubmit-Handler auf
        setName("");
        setSection(null);
        setQuantity("1");
    };

    const sections: Section[] = ["fruit", "vegetable", "dairy", "meat", "bakery", "beverages", "frozen", "snacks", "pantry", "household", "personal care", "other"];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="w-full p-4 space-y-4 border border-gray-300 rounded-md dark:text-gray-800">
                <legend className="text-2xl font-bold">Add a new item:</legend>
                <div className="relative rounded-md border border-gray-300">
                    <input type="text"
                           id="name"
                           name="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)} required
                           placeholder="Name"
                           className="w-full py-2 pl-3 text-sm rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-blue-600" />
                </div>
                <div className="relative rounded-md border border-gray-300">
                    <input type="text"
                           id="quantity"
                           name="quantity"
                           value={quantity}
                           onChange={(e) => setQuantity(e.target.value)}
                           placeholder="Quantity"
                           className="w-full py-2 pl-3 text-sm rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-blue-600" />
                </div>
                <div className="relative rounded-md border border-gray-300">
                    <select id="section"
                            name="section"
                            value={section || ""}
                            onChange={(e) => setSection(e.target.value as Section)}
                            className="w-full p-2 text-sm rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-blue-600">
                        <option value="" disabled>Select a section</option>
                        {sections.map((section, index) => (
                            <option key={index} value={section}>{section}</option>))}
                    </select>
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Add</button>
            </fieldset>
        </form>
    );
}
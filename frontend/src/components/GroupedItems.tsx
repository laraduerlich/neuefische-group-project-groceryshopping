import {Item} from "../type/Item.tsx";
import {useState} from "react";

type ItemListProps = {
    items: {
        item: Item,
        quantity: string
    }[],
    checkbox: boolean
}

function ListItemWithoutCheckbox(props: { item: { name: string; quantity: string } }) {
    return <li>{props.item.quantity} {props.item.name}</li>;
}

function ListItemWithCheckbox(props: { item: { name: string; quantity: string } }) {
    const [isChecked, setIsChecked] = useState(false);


    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
    };

    const inputId = `checkbox-${props.item.name}`;

    return <li className="flex items-center">
                <input
                    type="checkbox"
                    id={inputId}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 cursor-pointer rounded border border-gray-300 checked:bg-blue-600 checked:border-blue-600"
                />
                <label htmlFor={inputId} className={`ml-2 text-gray-800 ${isChecked ? 'line-through text-gray-500' : ''}`}>
                    {props.item.quantity} {props.item.name}
                </label>
    </li>
}

export default function GroupedItems({items, checkbox}: ItemListProps) {

    const groupBySection = (items: { item: Item, quantity: string }[]): Record<string, {
        name: string,
        quantity: string
    }[]> => {
        return items.reduce((acc, item) => {
            if (!acc[item.item.section]) {
                acc[item.item.section] = [];
            }
            acc[item.item.section].push({
                name: item.item.name,
                quantity: item.quantity
            });
            return acc;
        }, {} as Record<string, { name: string, quantity: string }[]>);
    };

    const groupedItems = groupBySection(items);

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (!items.length) {
        return (
            <>
                <h3>Items:</h3>
                <p>No items to display.</p>
            </>
        );
    }

    return (
        <>
            <h3>Items:</h3>
            <div>
                {Object.keys(groupedItems).map((section) => (
                    <div key={section}>
                        <h2>{capitalizeFirstLetter(section)}:</h2>
                        <ul>
{groupedItems[section].map((item) =>
    checkbox ? (
        <ListItemWithCheckbox key={item.name} item={item} />
    ) : (
        <ListItemWithoutCheckbox key={item.name} item={item} />
    )
)}

                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

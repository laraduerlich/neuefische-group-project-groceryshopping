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
        setIsChecked(!isChecked);
    };

    return <li className="flex items-center">
        <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
            <input type="checkbox"
                   checked={isChecked}
                   onChange={handleCheckboxChange}
                   className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                   id="check-2"/>
            <span
                className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5"
           viewBox="0 0 20 20" fill="currentColor"
           stroke="currentColor" stroke-width="1">
        <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
      </svg>
    </span>
        </label>
        <label className={`cursor-pointer ml-2 text-slate-600 text-sm ${
            isChecked ? 'line-through' : ''
        }`} htmlFor="check-2">
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
                            {groupedItems[section].map((item, index) => {
                                if (checkbox) {
                                    return <ListItemWithCheckbox key={index} item={item}/>
                            } else {
                                return <ListItemWithoutCheckbox key={index} item={item}/>}
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

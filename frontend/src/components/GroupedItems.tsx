import {Item} from "../type/Item.tsx";

type ItemListProps = {
    items:{
        item: Item,
        quantity: string
    }[]
}


export default function GroupedItems({items}: ItemListProps){

    const groupBySection = (items: {item: Item, quantity: string}[]): Record<string, {name: string, quantity: string}[]> => {
        return items.reduce((acc, item) => {
            if (!acc[item.item.section]) {
                acc[item.item.section] = [];
            }
            acc[item.item.section].push({name: item.item.name, quantity: item.quantity});
            return acc;
        }, {} as Record<string, {name: string, quantity: string}[]>);
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

    return(
        <>
            <h3>Items:</h3>
            <div>
                {Object.keys(groupedItems).map((section) => (
                    <div key={section}>
                        <h2>{capitalizeFirstLetter(section)}:</h2>
                        <ul>
                            {groupedItems[section].map((item, index) => (
                                <li key={index}>{item.quantity} {item.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

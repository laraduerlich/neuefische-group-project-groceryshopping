import GroupedItems from "../components/GroupedItems.tsx";
import {Item} from "../type/Item.tsx";

export default function ShoppingPage(){

    const items: {item: Item, quantity: string}[] = [
        {item: {name: "apple", section: "fruit"}, quantity: "1"},
        {item: {name: "banana", section: "fruit"}, quantity: "2"},
        {item: {name: "carrot", section: "vegetable"}, quantity: "3"},
        {item: {name: "milk", section: "dairy"}, quantity: "1"},
    ];

    return (
        <div className="shopping-page">
            Shopping Page
            <GroupedItems items={items} checkbox={true}/>
        </div>
    )
}

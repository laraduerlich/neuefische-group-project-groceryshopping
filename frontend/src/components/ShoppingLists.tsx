import {useState} from "react";

type ShoppingListsProps = {
    lists: {
        id: string,
        name: string
    }[],
    onButtonClick: (item: { id: string, name: string }) => void
}

export default function ShoppingLists ({lists, onButtonClick}: ShoppingListsProps)  {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredList = lists.filter((shoppingList) =>
        shoppingList.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
        <div>
            <input
                type="text"
                placeholder="Search for a list"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="shopping-list space-y-4">
            <ul className="space-y-2">
                {filteredList.map((list) => (
                    <li
                        key={list.id}
                        className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-gray-100 shadow-sm hover:bg-gray-200"
                    >
                        <span className="text-sm font-medium text-gray-800">{list.name}</span>
                        <button
                            onClick={() => onButtonClick(list)}
                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Button
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

import {useState} from "react";
import {useNavigate} from "react-router-dom";

type ShoppingListsProps = {
    lists?: {
        id: string,
        name: string
    }[],
    //onButtonClick: (item: { id: string, name: string }) => void
}

export default function ShoppingLists ({ lists = [] }: ShoppingListsProps) {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredList = lists.filter((shoppingList) =>
        shoppingList.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

    const handleGoShoppingButtonClick = (id: string) => {
        navigate("/shopping/" + id)
    };

    const handleNewShoppingListButtonClick = () => {
        navigate("/shoppinglist")
    };

    const navigate = useNavigate();

    return (
        <>
        <div className="flex justify-between items-center w-full">
            <input
                type="text"
                placeholder="Search for a list"
                className="flex-grow p-2 border border-gray-300 rounded-md"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                onClick={() => handleNewShoppingListButtonClick()}
                className="ml-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                New shopping list
            </button>
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
                            onClick={() => handleGoShoppingButtonClick(list.id)}
                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            🛒
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

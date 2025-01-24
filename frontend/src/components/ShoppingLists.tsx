import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import ButtonWithIcon from "./ButtonWithIcon";
import CartIcon from "./CartIcon";
import ViewIcon from "./ViewIcon";
import { getAllShoppingLists } from "../utils/dataService";
import { ShoppingList } from "../type/Types"; // Ensure ShoppingList is imported

export default function ShoppingLists() {
    const [searchTerm, setSearchTerm] = useState("");
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]); // State uses ShoppingList[]
    const navigate = useNavigate();

    // Filtered list based on search term
    const filteredList = shoppingLists?.filter((shoppingList) =>
           shoppingList?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch shopping lists on component mount
    useEffect(() => {
        getAllShoppingLists()
            .then((data) => {
                console.log("Fetched shopping lists successfully:", data); // Log fetched data
                setShoppingLists(data); // Set the fetched shopping lists
            })
            .catch((error) => {
                console.error("Error fetching shopping lists:", error); // Log errors
            });
    }, []);

    // Button handlers
    const handleGoShoppingButtonClick = (id: string | undefined) => {
        navigate("/shopping/" + id); // Navigate to the shopping page for the list
    };

    const handleViewButtonClick = (id: string | undefined) => {
        if (id) {
            navigate(`/shoppinglist/${id}`); // Use path parameter instead of query parameter
        } else {
            console.error("Invalid ID for viewing shopping list.");
        }
    };

    const handleNewShoppingListButtonClick = () => {
        navigate("/shoppinglist"); // Navigate to the page for creating a new shopping list
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 px-4">
            {/* Search and New List Button */}
            <div className="flex flex-col sm:flex-row items-center w-full max-w-3xl mx-auto my-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <SearchInput value={searchTerm} onChange={setSearchTerm} />
                <button
                    onClick={handleNewShoppingListButtonClick}
                    className="w-full sm:w-auto h-12 px-5 py-3 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 flex items-center justify-center space-x-2 min-w-[200px]"
                >
                    <span>+</span>
                    <span>Create New List</span>
                </button>
            </div>

            {/* List of Shopping Lists */}
            <div className="space-y-4">
                <ul className="space-y-4">
                    {filteredList.map((list) => (
                        <li
                            key={list.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-white/40 rounded-md backdrop-blur-md hover:bg-white/60"
                        >
              <span className="text-lg font-semibold text-gray-800 text-center sm:text-left">
                {list.name}
              </span>
                            {/* Buttons Container */}
                            <div className="flex space-x-4">
                                <ButtonWithIcon
                                    text="View"
                                    onClick={() => handleViewButtonClick(list.id)}
                                    icon={<ViewIcon />}
                                />
                                <ButtonWithIcon
                                    text="Go Shop"
                                    onClick={() => handleGoShoppingButtonClick(list.id)}
                                    icon={<CartIcon />}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

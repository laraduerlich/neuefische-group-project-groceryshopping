import GroupedItems from "../components/GroupedItems.tsx";
import { getShoppingListById } from "../utils/dataService.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingList } from "../type/Types.ts";

export default function ShoppingListPage() {
    const { id } = useParams<{ id: string }>()
    console.log("Extracted ID from useParams:", id);


    const [listData, setListData] = useState<ShoppingList | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch shopping list when ID changes
    useEffect(() => {
        console.log("useEffect triggered with id:", id);
        if (id) {
            console.log("Fetching shopping list for ID:", id);
            const fetchList = async () => {
                try {
                    setIsLoading(true);
                    const data = await getShoppingListById(id);
                    console.log("Fetched shopping list data:", data);
                    setListData(data);
                } catch (err) {
                    const errorMessage = err instanceof Error ? err.message : "Unknown error";
                    setError(errorMessage);
                    console.error("Error fetching shopping list:", errorMessage);
                } finally {
                    setIsLoading(false);
                    console.log("Fetching shopping list completed.");
                }
            };
            fetchList();
        } else {
            console.log("No ID provided.");
        }
    }, [id]);

    // Log listData whenever it changes
    useEffect(() => {
        console.log("Updated listData:", listData);
    }, [listData]);

    if (id && isLoading) return <div>Loading...</div>;
    if (id && error) return <div>Error: {error}</div>;

    return (
        <div className="shopping-page">
            {id ? (
                // Existing shopping list
                <>
                    <h1 className="text-lg font-semibold">{listData?.name}</h1>
                    <GroupedItems items={listData?.list || []} checkbox={true} />
                </>
            ) : (
                // New shopping list
                <>
                    <h1 className="text-lg font-semibold">Create a New Shopping List</h1>
                    {/* Add form or components for creating a new list */}
                </>
            )}
        </div>
    );
}

import GroupedItems from "../components/GroupedItems.tsx";
import {getShoppingListById} from "../utils/dataService.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ShoppingList} from "../type/Types.ts";

export default function ShoppingPage(){

    const {id} = useParams<{ id: string }>();

    const [listData, setListData] = useState<ShoppingList | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === undefined) {
            setError("No id")
        } else {
            const fetchList = async () => {
                try {
                    setIsLoading(true);
                    const data = await getShoppingListById(id);
                    setListData(data);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                } finally {
                    setIsLoading(false);
                }
            };
        fetchList();
    }}, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!listData) return <div>No list found</div>;

    return (
        <div className="shopping-page">
            <GroupedItems items={listData.list} checkbox={true}/>
        </div>
    )
}


type ShoppingListsProps = {
    lists: {
        id: string,
        name: string
    }[]
}

export default function ShoppingLists ({lists}: ShoppingListsProps)  {

    return (
        <div className="shopping-list">
            <ul>
            {lists.map((list: {id: string, name: string}) => (
                <li>{list.name}</li>
            ))}
            </ul>
        </div>
    )
}

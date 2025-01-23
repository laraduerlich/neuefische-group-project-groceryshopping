import ShoppingLists from "../components/ShoppingLists.tsx";

export default function HomePage(){

    const lists: {id: string, name: string}[] = [
        { id: "1", name: "Einkaufsliste" },
        { id: "2", name: "Arbeitsaufgaben" },
        { id: "3", name: "Urlaubsplanung" },
        { id: "4", name: "Fitnessziele" },
        { id: "5", name: "Projektideen" },
        // { id: "6", name: "Hobbies" },
        // { id: "7", name: "BBQ" },
        // { id: "8", name: "Spring Cleaning" },
    ];


    return (
        <div className="home-page">
            <ShoppingLists lists={lists}/>
        </div>
    )
}

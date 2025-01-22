import ShoppingLists from "../components/ShoppingLists.tsx";
import {useNavigate, useParams} from "react-router-dom";

export default function HomePage(){

    const lists: {id: string, name: string}[] = [
        { id: "1", name: "Einkaufsliste" },
        { id: "2", name: "Arbeitsaufgaben" },
        { id: "3", name: "Urlaubsplanung" },
        { id: "4", name: "Fitnessziele" },
        { id: "5", name: "Projektideen" },
    ];

    const navigate = useNavigate();
    const params = useParams();

    const handleButtonClick = () => {
        navigate("/shoppinglist/" + params.id)
    };

    return (
        <div className="home-page">
            HomePage
            <ShoppingLists lists={lists} onButtonClick={handleButtonClick}/>
        </div>
    )
}
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

type LandingPageProps = {
    userName: string | undefined
}
export default function LandingPage(userName:LandingPageProps) {

console.log(userName.userName)
const navigate=useNavigate()

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.host
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    useEffect(()=>{
        if(userName.userName) {
            navigate("/home")
        }
    }, [userName.userName])

    return (
        <>
            <button onClick={login}>Login</button>
        </>
    )
}
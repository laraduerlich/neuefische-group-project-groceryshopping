import {useEffect, useState} from "react";
import axios from "axios";

type LandingPageProps = {
    userName: string | undefined
}
export default function LandingPage(userName:LandingPageProps) {

    const[username, setUsername] = useState<string|undefined>()

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.host
        window.open(host + "/oauth2/authorization/github", "_self")
    }


    return (
        <>
            <button onClick={login}>Login</button>
        </>
    )
}
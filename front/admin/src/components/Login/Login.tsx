import styles from "./Login.module.scss";
import Logo from "../Logo/Logo";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: any) {
        e.preventDefault();
        try {
            const formData = new FormData();

            // Add fields with values to the FormData object
            formData.append("login", login);
            formData.append("password", password);

            const response = await axios.post(
                "http://127.0.0.1:5000/login",
                formData,
                {
                    withCredentials: true, // Ensure cookies are sent
                },
            );
            localStorage.setItem("access_token", response.data.access_token);
            navigate("/main");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed! Please check your credentials.");
        }
    }

    return (
        <>
            <div className={styles.login}>
                <Logo />
                <form className={styles.login__form}>
                    <input
                        className={styles["login__form-input"]}
                        type="text"
                        placeholder="Enter login..."
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        className={styles["login__form-input"]}
                        type="password"
                        placeholder="Enter password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className={styles["login__form-submit"]}
                        type="submit"
                        value="Login"
                        onClick={(e) => handleLogin(e)}
                    />
                </form>
            </div>
        </>
    );
}

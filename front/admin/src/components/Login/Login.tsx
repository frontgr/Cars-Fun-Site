import styles from "./Login.module.scss";
import Logo from "../Logo/Logo";
import axios from "axios";
import { useEffect } from "react";

export default function Login() {
    return (
        <>
            <div className={styles.login}>
                <Logo />
                <form className={styles.login__form}>
                    <input
                        className={styles["login__form-input"]}
                        type="text"
                        placeholder="Enter login..."
                    />
                    <input
                        className={styles["login__form-input"]}
                        type="password"
                        placeholder="Enter password..."
                    />
                    <input
                        className={styles["login__form-submit"]}
                        type="submit"
                        value="Login"
                    />
                </form>
            </div>
        </>
    );
}

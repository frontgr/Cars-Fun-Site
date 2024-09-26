import styles from "./Logo.module.scss";
import { useNavigate } from "react-router-dom";

export default function Logo({ location }: any) {
    const navigateToMain = useNavigate();
    return (
        <a
            className={styles.logo}
            onClick={() =>
                location === "main"
                    ? navigateToMain("Content")
                    : navigateToMain("/")
            }
        >
            Cars.<span> Fan Site</span>
        </a>
    );
}

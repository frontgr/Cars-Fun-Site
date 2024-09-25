import styles from "./Logo.module.scss";
import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigateToMain = useNavigate();
    return (
        <a className={styles.logo} onClick={() => navigateToMain("/")}>
            Cars.<span> Fan Site</span>
        </a>
    );
}

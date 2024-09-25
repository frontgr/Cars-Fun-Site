import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

export default function ErrorPage() {
    return (
        <div className={styles.error}>
            <p className={styles.error__text}>404 - Not Found</p>
            <Link to="/" className={styles.error__btn}>
                Back
            </Link>
        </div>
    );
}

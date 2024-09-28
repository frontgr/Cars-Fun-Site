import styles from "./Users.module.scss";

export default function Users() {
    return (
        <>
            <div className={styles.users}>
                <button className={styles["users__add-user"]}>Add user</button>
            </div>
        </>
    );
}

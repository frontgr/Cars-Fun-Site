import styles from "./AdminItem.module.scss";
import EditButton from "../../../Assets/Edit.svg";
import DeleteButton from "../../../Assets/Delete.svg";

interface AdminItemProp {
    name: string;
    index: number;
}

const AdminItem: React.FC<AdminItemProp> = ({ name, index }) => {
    return (
        <li
            className={
                index !== 0
                    ? styles["admin-item"]
                    : `${styles["admin-item"]} ${styles["admin-item--root-admin"]}`
            }
        >
            <span className={styles["admin-item__name"]}>{name}</span>
            {index !== 0 ? (
                <div className={styles["admin-item__buttons"]}>
                    <button className={styles["admin-item__buttons-button"]}>
                        <img src={EditButton} alt="edit" />
                    </button>
                    <button className={styles["admin-item__buttons-button"]}>
                        <img src={DeleteButton} alt="delete" />
                    </button>
                </div>
            ) : null}
        </li>
    );
};

export default AdminItem;

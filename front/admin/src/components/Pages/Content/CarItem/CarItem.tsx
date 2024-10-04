import styles from "./CarItem.module.scss";

import EditButton from "../../../Assets/Edit.svg";
import OpenEye from "../../../Assets/Open_Eye.svg";
import OpenEyeClose from "../../../Assets/Open_Eye-close.svg";
import DeleteButton from "../../../Assets/Delete.svg";

interface CarItemProps {
    id: string;
    name: string;
    number: number;
    is_hidden: boolean;
    clickOnEye: (id: string) => void;
}
const CarItem: React.FC<CarItemProps> = (car) => {
    const { id, name, number, is_hidden, clickOnEye } = car;
    return (
        <li className={styles["content__list-item"]}>
            <span className={styles["content__list-item-name"]}>
                {name}
                <span className={styles["content__list-item-number"]}>
                    {" "}
                    {number}
                </span>
            </span>
            <div className={styles["content__list-item-buttons"]}>
                <button className={styles["content__list-item-button"]}>
                    <img
                        src={EditButton}
                        alt="edit"
                        className={styles["content__list-item-button-icon"]}
                    />
                </button>
                <button
                    className={styles["content__list-item-button"]}
                    onClick={() => {
                        clickOnEye(id);
                    }}
                >
                    <img
                        src={is_hidden ? OpenEyeClose : OpenEye}
                        alt="is hidden"
                        className={styles["content__list-item-button-icon"]}
                    />
                </button>
                <button className={styles["content__list-item-button"]}>
                    <img
                        src={DeleteButton}
                        alt="delete"
                        className={styles["content__list-item-button-icon"]}
                    />
                </button>
            </div>
        </li>
    );
};

export default CarItem;

import styles from "./AdminItem.module.scss";
import EditButton from "../../../Assets/Edit.svg";
import DeleteButton from "../../../Assets/Delete.svg";
import axios from "axios";
import Modal from "../../../Modal/Modal";
import EditAdminPopup from "../Popups/EditAdminPopup/EditAdminPopup";
import { useState } from "react";

interface AdminItemProp {
    id: string;
    name: string;
    index: number;
    isModal: any[];
    permissions: {
        add_users: boolean;
        delete_users: boolean;
        edit_users: boolean;
    };
    setIsModal: any;
}

const AdminItem: React.FC<AdminItemProp> = ({
    id,
    name,
    index,
    isModal,
    permissions,
    setIsModal,
}) => {
    const [editAdminPopup, setEditAdminPopup] = useState([false, ""]);
    const handdleDeleteButton = (id: string) => {
        axios
            .delete(`http://127.0.0.1:5000/panel/admin?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token",
                    )}`,
                },
            })
            .then((res) => {
                if (res.status === 204) {
                    console.log(res);
                }
            });
    };
    return (
        <li
            className={
                index !== 0
                    ? styles["admin-item"]
                    : `${styles["admin-item"]} ${styles["admin-item--root-admin"]}`
            }
        >
            {" "}
            {editAdminPopup[0] && typeof editAdminPopup[1] === "string" && (
                <EditAdminPopup
                    id={editAdminPopup[1]}
                    name={name}
                    setEditAdminPopup={setEditAdminPopup}
                />
            )}
            <span className={styles["admin-item__name"]}>
                {localStorage.getItem("cars_login") === name ? (
                    <span>
                        {name} <span>(you)</span>
                    </span>
                ) : (
                    name
                )}
            </span>
            {index !== 0 && localStorage.getItem("cars_login") !== name ? (
                <div className={styles["admin-item__buttons"]}>
                    {permissions.edit_users && (
                        <button
                            className={styles["admin-item__buttons-button"]}
                            onClick={() => {
                                setEditAdminPopup([true, id]);
                                console.log(editAdminPopup);
                            }}
                        >
                            <img src={EditButton} alt="edit" />
                        </button>
                    )}
                    {permissions.delete_users && (
                        <button
                            className={styles["admin-item__buttons-button"]}
                            onClick={() => {
                                setIsModal(["deleteAdminDone", true, id]);
                            }}
                        >
                            <img src={DeleteButton} alt="delete" />
                        </button>
                    )}
                </div>
            ) : null}
            {isModal[1] &&
            isModal[0] === "deleteAdminDone" &&
            isModal[2] === id ? (
                <Modal
                    type="deleteAdminDone"
                    setIsModal={setIsModal}
                    handdleDeleteButton={handdleDeleteButton}
                    adminId={id}
                />
            ) : null}
        </li>
    );
};

export default AdminItem;

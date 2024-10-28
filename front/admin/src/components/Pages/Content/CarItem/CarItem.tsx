import styles from "./CarItem.module.scss";

import EditButton from "../../../Assets/Edit.svg";
import OpenEye from "../../../Assets/Open_Eye.svg";
import OpenEyeClose from "../../../Assets/Open_Eye-close.svg";
import DeleteButton from "../../../Assets/Delete.svg";
import { useState } from "react";
import Modal from "../../../Modal/Modal";
import axios from "axios";

interface CarItemProps {
    id: string;
    name: string;
    number: number;
    is_hidden: boolean;
    permissions: {
        add_car: boolean;
        delete_cars: boolean;
        edit_cars: boolean;
    };
    setIsModal: any;
    isModal: any[];
    clickOnEye: (id: string) => void;
}
const CarItem: React.FC<CarItemProps> = (car) => {
    const {
        id,
        name,
        number,
        is_hidden,
        permissions,
        setIsModal,
        isModal,
        clickOnEye,
    } = car;

    const handdleDeleteButton = (id: string) => {
        axios
            .delete(`http://127.0.0.1:5000/panel/car?id=${id}`, {
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
        <li className={styles["content__list-item"]}>
            <span className={styles["content__list-item-name"]}>
                {name}
                <span className={styles["content__list-item-number"]}>
                    {" "}
                    {number}
                </span>
            </span>
            <div className={styles["content__list-item-buttons"]}>
                {permissions.edit_cars && (
                    <button className={styles["content__list-item-button"]}>
                        <img
                            src={EditButton}
                            alt="edit"
                            className={styles["content__list-item-button-icon"]}
                        />
                    </button>
                )}
                {permissions.edit_cars && (
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
                )}
                {permissions.delete_cars && (
                    <button
                        className={styles["content__list-item-button"]}
                        onClick={() => setIsModal(["deleteCarDone", true, id])}
                    >
                        <img
                            src={DeleteButton}
                            alt="delete"
                            className={styles["content__list-item-button-icon"]}
                        />
                    </button>
                )}
            </div>
            {isModal[1] &&
            isModal[0] === "deleteCarDone" &&
            isModal[2] === id ? (
                <Modal
                    type="deleteCarDone"
                    setIsModal={setIsModal}
                    handdleDeleteButton={handdleDeleteButton}
                    carId={id}
                />
            ) : null}
        </li>
    );
};

export default CarItem;

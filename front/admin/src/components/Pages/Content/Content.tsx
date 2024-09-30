import styles from "./Content.module.scss";

import EditButton from "../../Assets/Edit.svg";
import OpenEye from "../../Assets/Open_Eye.svg";
import OpenEyeClose from "../../Assets/Open_Eye-close.svg";
import DeleteButton from "../../Assets/Delete.svg";
import AddCarPopup from "./Poups/AddCarPopup/AddCarPopup";

import { useState, useEffect } from "react";
import axios from "axios";
export default function Content() {
    const [isPopupAddCarVisible, setIsPopupAddCarVisible] = useState(false);
    const [cars, setCars] = useState([]);
    function getCarsData() {
        axios
            .get("http://127.0.0.1:5000/panel/cars", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token",
                    )}`,
                },
            })
            .then((response) => {
                console.log(Object.values(response.data));
                setCars(Object.values(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getCarsData();
    }, []);
    return (
        <>
            {isPopupAddCarVisible && (
                <AddCarPopup
                    setIsPopupAddCarVisible={setIsPopupAddCarVisible}
                    getCarsData={getCarsData}
                />
            )}
            <div className={styles.content}>
                <div className={styles.content__wrapper}>
                    <button
                        className={styles["content__add-car"]}
                        onClick={() => setIsPopupAddCarVisible(true)}
                    >
                        Add car
                    </button>
                    <ul className={styles.content__list}>
                        {cars.map((car: any) => (
                            <li
                                key={car.id}
                                className={styles["content__list-item"]}
                            >
                                <span
                                    className={
                                        styles["content__list-item-name"]
                                    }
                                >
                                    {car.name}
                                    <span
                                        className={
                                            styles["content__list-item-number"]
                                        }
                                    >
                                        {" "}
                                        {car.number}
                                    </span>
                                </span>
                                <div
                                    className={
                                        styles["content__list-item-buttons"]
                                    }
                                >
                                    <button
                                        className={
                                            styles["content__list-item-button"]
                                        }
                                    >
                                        <img
                                            src={EditButton}
                                            alt="edit"
                                            className={
                                                styles[
                                                    "content__list-item-button-icon"
                                                ]
                                            }
                                        />
                                    </button>
                                    <button
                                        className={
                                            styles["content__list-item-button"]
                                        }
                                        onClick={() => {
                                            const index = cars.findIndex(
                                                (c) => c === car,
                                            );
                                            const carsNew = JSON.parse(
                                                JSON.stringify(cars),
                                            );

                                            carsNew[index].is_hidden =
                                                !carsNew[index].is_hidden;
                                            setCars(carsNew);
                                        }}
                                    >
                                        <img
                                            src={
                                                car.is_hidden
                                                    ? OpenEyeClose
                                                    : OpenEye
                                            }
                                            alt="edit"
                                            className={
                                                styles[
                                                    "content__list-item-button-icon"
                                                ]
                                            }
                                        />
                                    </button>
                                    <button
                                        className={
                                            styles["content__list-item-button"]
                                        }
                                    >
                                        <img
                                            src={DeleteButton}
                                            alt="edit"
                                            className={
                                                styles[
                                                    "content__list-item-button-icon"
                                                ]
                                            }
                                        />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

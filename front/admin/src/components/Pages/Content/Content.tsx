import styles from "./Content.module.scss";

import EditButton from "../../Assets/Edit.svg";
import OpenEye from "../../Assets/Open_Eye.svg";
import DeleteButton from "../../Assets/Delete.svg";
import AddCarPopup from "./Poups/AddCarPopup/AddCarPopup";

import { useState } from "react";

export default function Content() {
    const [isPopupAddCarVisible, setIsPopupAddCarVisible] = useState(false);

    return (
        <>
            {isPopupAddCarVisible && (
                <AddCarPopup
                    setIsPopupAddCarVisible={setIsPopupAddCarVisible}
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
                        <li className={styles["content__list-item"]}>
                            <span className={styles["content__list-item-name"]}>
                                Car name{" "}
                                <span
                                    className={
                                        styles["content__list-item-number"]
                                    }
                                >
                                    #95
                                </span>
                            </span>
                            <div
                                className={styles["content__list-item-buttons"]}
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
                                >
                                    <img
                                        src={OpenEye}
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
                        <li className={styles["content__list-item"]}>
                            <span className={styles["content__list-item-name"]}>
                                Car name{" "}
                                <span
                                    className={
                                        styles["content__list-item-number"]
                                    }
                                >
                                    #32
                                </span>
                            </span>
                            <div
                                className={styles["content__list-item-buttons"]}
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
                                >
                                    <img
                                        src={OpenEye}
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
                        <li className={styles["content__list-item"]}>
                            <span className={styles["content__list-item-name"]}>
                                Car name{" "}
                                <span
                                    className={
                                        styles["content__list-item-number"]
                                    }
                                >
                                    #11
                                </span>
                            </span>
                            <div
                                className={styles["content__list-item-buttons"]}
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
                                >
                                    <img
                                        src={OpenEye}
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
                    </ul>
                </div>
            </div>
        </>
    );
}

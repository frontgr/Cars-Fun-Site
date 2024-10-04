import { useState } from "react";
import Close from "../../../../Assets/Delete.svg";
import styles from "./AddAdminPopup.module.scss";
import handleAddAdmin from "../../../../../utils/handleAddAdmin";
import Modal from "../../../../Modal/Modal";

interface AddAdminPopupProps {
    setIsAddAdminPopupVisible: (visible: boolean) => void;
}

interface IForm {
    login: string;
    password: string;
    add_users: boolean;
    edit_users: boolean;
    delete_users: boolean;
    add_cars: boolean;
    edit_cars: boolean;
    delete_cars: boolean;
}

interface ILogin {
    event: React.ChangeEvent<HTMLInputElement>;
    type: string;
}

const AddAdminPopup: React.FC<AddAdminPopupProps> = ({
    setIsAddAdminPopupVisible,
}: AddAdminPopupProps) => {
    const [formValues, setFormValues] = useState<IForm>({
        login: "",
        password: "",
        add_users: false,
        edit_users: false,
        delete_users: false,
        add_cars: false,
        edit_cars: false,
        delete_cars: false,
    });

    const [isModalVisible, setIsModalVisible] = useState(["", false]);

    const handdleInputChange = (value: string, checked: boolean) => {
        const newFormValues = JSON.parse(JSON.stringify(formValues));
        newFormValues[value] = checked;
        setFormValues(newFormValues);
    };
    const handdleLoginChange = ({ event, type }: ILogin): void => {
        const newFormValues: IForm = JSON.parse(JSON.stringify(formValues));
        type === "login"
            ? (newFormValues.login = event.target.value)
            : (newFormValues.password = event.target.value);
        setFormValues(newFormValues);
        console.log(formValues);
    };
    return (
        <div className={styles["add-admin-popup"]}>
            <div className={styles["add-admin-popup__content"]}>
                <button
                    className={styles["add-admin-popup__close"]}
                    onClick={() => setIsAddAdminPopupVisible(false)}
                >
                    <img src={Close} alt="Close" />
                </button>
                <h2 className={styles["add-admin-popup__content-heading"]}>
                    Add an admin
                </h2>
                <form
                    action=""
                    className={styles["add-admin-popup__content-form"]}
                >
                    <div
                        className={
                            styles["add-admin-popup__content-form-login"]
                        }
                    >
                        <input
                            type="text"
                            placeholder="Login of a new admin..."
                            defaultValue={""}
                            value={formValues.login}
                            className={
                                styles[
                                    "add-admin-popup__content-form-login-input"
                                ]
                            }
                            onChange={(event) =>
                                handdleLoginChange({ event, type: "login" })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Password of a new admin..."
                            defaultValue={""}
                            value={formValues.password}
                            className={
                                styles[
                                    "add-admin-popup__content-form-login-input"
                                ]
                            }
                            onChange={(event) =>
                                handdleLoginChange({ event, type: "password" })
                            }
                        />
                    </div>
                    <div
                        className={
                            styles["add-admin-popup__content-form-checkboxes"]
                        }
                    >
                        <h2
                            className={
                                styles[
                                    "add-admin-popup__content-form-checkboxes-heading"
                                ]
                            }
                        >
                            New admin can
                        </h2>
                        <div
                            className={
                                styles[
                                    "add-admin-popup__content-form-checkboxes-container"
                                ]
                            }
                        >
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Add cars
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.add_cars}
                                    onClick={(e) =>
                                        handdleInputChange(
                                            "add_cars",
                                            (e.target as HTMLInputElement)
                                                .checked,
                                        )
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Add users
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.add_users}
                                    onClick={(e) =>
                                        handdleInputChange(
                                            "add_users",
                                            (e.target as HTMLInputElement)
                                                .checked,
                                        )
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Hide cars
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Edit users
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.edit_users}
                                    onClick={(e) =>
                                        handdleInputChange(
                                            "edit_users",
                                            (e.target as HTMLInputElement)
                                                .checked,
                                        )
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Edit cars
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.edit_cars}
                                    onClick={(e) =>
                                        handdleInputChange(
                                            "edit_cars",
                                            (e.target as HTMLInputElement)
                                                .checked,
                                        )
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Delete users
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.delete_users}
                                    onClick={(e) =>
                                        handdleInputChange(
                                            "delete_users",
                                            (e.target as HTMLInputElement)
                                                .checked,
                                        )
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Delete cars
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.delete_cars}
                                    onClick={(e) =>
                                        handdleInputChange(
                                            "delete_cars",
                                            (e.target as HTMLInputElement)
                                                .checked,
                                        )
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "add-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                See analytics
                                <input
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "add-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                        </div>
                    </div>
                    <div
                        className={
                            styles["add-admin-popup__add-button-wrapper"]
                        }
                    >
                        <input
                            type="submit"
                            className={styles["add-admin-popup__add-button"]}
                            value="Add admin"
                            onClick={(event) => {
                                event.preventDefault();
                                handleAddAdmin(formValues).then((res) => {
                                    if (res) {
                                        console.log(res);
                                        setFormValues({
                                            login: "",
                                            password: "",
                                            add_users: false,
                                            edit_users: false,
                                            delete_users: false,
                                            add_cars: false,
                                            edit_cars: false,
                                            delete_cars: false,
                                        });
                                        setIsModalVisible([
                                            "addAdminDone",
                                            true,
                                        ]);
                                    } else {
                                        console.log("error");
                                        setIsModalVisible([
                                            "addAdminFail",
                                            true,
                                        ]);
                                    }
                                });
                            }}
                        />
                    </div>
                </form>
            </div>

            <div className={styles["add-admin-popup__overlay"]}></div>
            {isModalVisible[1] && isModalVisible[0] === "addAdminDone" ? (
                <Modal type="addAdminDone" setIsModal={setIsModalVisible} />
            ) : null}
            {isModalVisible[1] && isModalVisible[0] === "addCarFail" ? (
                <Modal type="addAdminFail" setIsModal={setIsModalVisible} />
            ) : null}
        </div>
    );
};

export default AddAdminPopup;

import styles from "./EditAdminPopup.module.scss";
import { IAdmin } from "../../../../../utils/getAdmins";
import { useEffect, useState } from "react";

import Close from "../../../../Assets/Delete.svg";
import getAdmins from "../../../../../utils/getAdmins";
import { IForm } from "../AddAdminPopup/AddAdminPopup";

interface EditAdminPopupProps {
    id: string;
    name: string;
    setEditAdminPopup: (value: [boolean, string]) => void;
}
interface ILogin {
    event: React.ChangeEvent<HTMLInputElement>;
    type: string;
}
const EditAdminPopup = ({
    id,
    name,
    setEditAdminPopup,
}: EditAdminPopupProps) => {
    const [admin, setAdmin] = useState<object | undefined>({});
    const findSeletedAdmin = (admin: any) => {
        return admin.login === name;
    };
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
    useEffect(() => {
        const fetchAdmins = async () => {
            const admins = await getAdmins();
            const admin: IAdmin | undefined = admins?.find(findSeletedAdmin);

            setAdmin(admin!);
        };
        fetchAdmins();
    }, []);
    return (
        <div className={styles["edit-admin-popup"]}>
            <div className={styles["edit-admin-popup__content"]}>
                <button
                    className={styles["edit-admin-popup__close"]}
                    onClick={() => {
                        setEditAdminPopup([false, ""]);
                    }}
                >
                    <img src={Close} alt="Close" />
                </button>
                <h2 className={styles["edit-admin-popup__content-heading"]}>
                    Edit admin: {name}
                </h2>{" "}
                <form
                    action=""
                    className={styles["edit-admin-popup__content-form"]}
                >
                    <div
                        className={
                            styles["edit-admin-popup__content-form-login"]
                        }
                    >
                        <input
                            type="text"
                            placeholder="New login..."
                            value={formValues.login}
                            className={
                                styles[
                                    "edit-admin-popup__content-form-login-input"
                                ]
                            }
                            onChange={(event) =>
                                handdleLoginChange({ event, type: "login" })
                            }
                        />
                        <input
                            type="text"
                            placeholder="New password..."
                            value={formValues.password}
                            className={
                                styles[
                                    "edit-admin-popup__content-form-login-input"
                                ]
                            }
                            onChange={(event) =>
                                handdleLoginChange({ event, type: "password" })
                            }
                        />
                    </div>
                    <div
                        className={
                            styles["edit-admin-popup__content-form-checkboxes"]
                        }
                    >
                        <h2
                            className={
                                styles[
                                    "edit-admin-popup__content-form-checkboxes-heading"
                                ]
                            }
                        >
                            Admin can:
                        </h2>
                        <div
                            className={
                                styles[
                                    "edit-admin-popup__content-form-checkboxes-container"
                                ]
                            }
                        >
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Add cars
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.add_cars}
                                    onChange={(e) =>
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
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Add users
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.add_users}
                                    onChange={(e) =>
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
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Hide cars
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Edit users
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.edit_users}
                                    onChange={(e) =>
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
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Edit cars
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.edit_cars}
                                    onChange={(e) =>
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
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Delete users
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.delete_users}
                                    onChange={(e) =>
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
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                Delete cars
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    checked={formValues.delete_cars}
                                    onChange={(e) =>
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
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                            <label
                                className={
                                    styles[
                                        "edit-admin-popup__content-form-checkboxes-container-label"
                                    ]
                                }
                            >
                                See analytics
                                <input
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkbox"
                                        ]
                                    }
                                    type="checkbox"
                                />
                                <span
                                    className={
                                        styles[
                                            "edit-admin-popup__content-form-checkboxes-container-label-checkmark"
                                        ]
                                    }
                                ></span>
                            </label>
                        </div>
                    </div>
                    <div
                        className={
                            styles["edit-admin-popup__add-button-wrapper"]
                        }
                    >
                        <input
                            type="submit"
                            className={styles["edit-admin-popup__add-button"]}
                            value="Add admin"
                            onClick={(event) => {
                                event.preventDefault();
                                // handleEditAdmin(formValues).then((res) => {
                                //     if (res) {
                                //         console.log(res);
                                //         setFormValues({
                                //             login: "",
                                //             password: "",
                                //             add_users: false,
                                //             edit_users: false,
                                //             delete_users: false,
                                //             add_cars: false,
                                //             edit_cars: false,
                                //             delete_cars: false,
                                //         });
                                //         setIsModalVisible([
                                //             "addAdminDone",
                                //             true,
                                //         ]);
                                //     } else {
                                //         console.log("error");
                                //         setIsModalVisible([
                                //             "addAdminFail",
                                //             true,
                                //         ]);
                                //     }
                                // });
                            }}
                        />
                    </div>
                </form>
            </div>
            <div className={styles["edit-admin-popup__overlay"]}></div>
        </div>
    );
};

export default EditAdminPopup;

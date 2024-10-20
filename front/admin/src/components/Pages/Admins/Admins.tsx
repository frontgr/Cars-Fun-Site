import styles from "./Admins.module.scss";
import getAdmins, { IAdmin } from "../../../utils/getAdmins.tsx";
import { useEffect, useState } from "react";
import AdminItem from "./AdminItem/AdminItem.tsx";
import AddAdminPopup from "./Popups/AddAdminPopup/AddAdminPopup.tsx";

export default function Admins() {
    const [admins, setAdmins] = useState<IAdmin[]>([]);
    const [isPopupAddAdminVisible, setIsAddAdminPopupVisible] = useState(false);
    const [isModal, setIsModal] = useState(["", false, ""]);
    const [permissions, setPermissions] = useState({
        add_users: false,
        edit_users: false,
        delete_users: false,
    });
    useEffect(() => {
        const fetchAdmins = async () => {
            const admins = await getAdmins();
            setAdmins(admins!);
            admins?.map((admin) => {
                if (localStorage.getItem("cars_login") === admin.login) {
                    setPermissions({
                        add_users: admin.add_users,
                        edit_users: admin.edit_cars,
                        delete_users: admin.delete_users,
                    });
                }
            });
        };
        fetchAdmins();
    }, [isPopupAddAdminVisible, isModal]);

    return (
        <div className={styles.admins}>
            {isPopupAddAdminVisible && (
                <AddAdminPopup
                    setIsAddAdminPopupVisible={setIsAddAdminPopupVisible}
                />
            )}
            {permissions.add_users && (
                <div className={styles.admins__wrapper}>
                    <button
                        className={styles["admins__add-admin"]}
                        onClick={() => setIsAddAdminPopupVisible(true)}
                    >
                        Add admin
                    </button>
                </div>
            )}

            <ul className={styles["admins__list"]}>
                {admins &&
                    admins.map((admin, index) => (
                        <AdminItem
                            id={admin.id}
                            key={admin.id}
                            name={admin.login}
                            index={index}
                            isModal={isModal}
                            permissions={permissions}
                            setIsModal={setIsModal}
                        />
                    ))}
            </ul>
        </div>
    );
}

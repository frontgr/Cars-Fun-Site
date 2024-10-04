import styles from "./Admins.module.scss";
import getAdmins, { IAdmin } from "../../../utils/getAdmins.tsx";
import { useEffect, useState } from "react";
import AdminItem from "./AdminItem/AdminItem.tsx";
import AddAdminPopup from "./Popups/AddAdminPopup/AddAdminPopup.tsx";

export default function Admins() {
    const [admins, setAdmins] = useState<IAdmin[] | undefined>(undefined);
    const [isPopupAddAdminVisible, setIsAddAdminPopupVisible] = useState(false);

    useEffect(() => {
        const fetchAdmins = async () => {
            const admins = await getAdmins();
            setAdmins(admins);
        };
        fetchAdmins();
    }, [isPopupAddAdminVisible]);

    return (
        <div className={styles.admins}>
            {isPopupAddAdminVisible && (
                <AddAdminPopup
                    setIsAddAdminPopupVisible={setIsAddAdminPopupVisible}
                />
            )}
            <div className={styles.admins__wrapper}>
                <button
                    className={styles["admins__add-admin"]}
                    onClick={() => setIsAddAdminPopupVisible(true)}
                >
                    Add admin
                </button>
            </div>
            <ul className={styles["admins__list"]}>
                {admins &&
                    admins.map((admin, index) => (
                        <AdminItem
                            key={admin._id}
                            name={admin.login}
                            index={index}
                        />
                    ))}
            </ul>
        </div>
    );
}

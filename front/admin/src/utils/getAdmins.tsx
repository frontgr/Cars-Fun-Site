import axios from "axios";

export interface IAdmin {
    _id: string;
    add_cars: boolean;
    add_users: boolean;
    delete_cars: boolean;
    delete_users: boolean;
    edit_cars: boolean;
    edit_users: boolean;
    login: string;
}

const getAdmins: () => Promise<IAdmin[] | undefined> = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:5000/panel/admins", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return Object.values(response.data) as IAdmin[];
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export default getAdmins;

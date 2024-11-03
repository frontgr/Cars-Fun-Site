import axios from "axios";

export interface INewAdmin {
    login: string;
    password: string;
    add_users: boolean;
    edit_users: boolean;
    delete_users: boolean;
    add_cars: boolean;
    edit_cars: boolean;
    delete_cars: boolean;
}

const handleAddAdmin = async (
    admin: INewAdmin,
): Promise<string | undefined> => {
    try {
        const formData = new FormData();
        admin.login ? formData.append("login", admin.login) : null;
        admin.password ? formData.append("password", admin.password) : null;
        admin.add_users ? formData.append("add_users", "True") : null;
        admin.edit_users ? formData.append("edit_users", "True") : null;
        admin.delete_users ? formData.append("delete_users", "True") : null;
        admin.add_cars ? formData.append("add_cars", "True") : null;
        admin.edit_cars ? formData.append("edit_cars", "True") : null;
        admin.delete_cars ? formData.append("delete_cars", "True") : null;

        const response = await axios.post(
            "http://127.0.0.1:5000/panel/admin",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token",
                    )}`,
                },
            },
        );
        return response.data as string;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export default handleAddAdmin;

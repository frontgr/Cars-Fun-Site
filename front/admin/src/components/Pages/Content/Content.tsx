import styles from "./Content.module.scss";

import AddCarPopup from "./Poups/AddCarPopup/AddCarPopup";
import CarItem from "./CarItem/CarItem";
import getAdmins from "../../../utils/getAdmins";

import { useState, useEffect } from "react";
import axios from "axios";

interface ICar {
    id: string;
    cover_photo: string;
    description: string;
    folder_id: string;
    is_hidden: boolean;
    max_speed: number;
    name: string;
    number: number;
    photos: string[];
    speed_up: number;
    type: "racer" | "other";
}

export default function Content() {
    const [isPopupAddCarVisible, setIsPopupAddCarVisible] = useState(false);
    const [cars, setCars] = useState<ICar[] | undefined>(undefined);
    const [permissions, setPermissions] = useState({
        add_car: false,
        delete_cars: false,
        edit_cars: false,
    });
    const [isModal, setIsModal] = useState(["", false, ""]);

    useEffect(() => {
        const fetchAdmins = async () => {
            const admins = await getAdmins();
            admins?.map((car) => {
                if (localStorage.getItem("cars_login") === car.login) {
                    setPermissions({
                        add_car: car.add_cars,
                        edit_cars: car.edit_cars,
                        delete_cars: car.delete_cars,
                    });
                }
            });
        };
        fetchAdmins();
    }, []);

    const getCarsData: () => Promise<ICar[] | undefined> = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:5000/panel/cars",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token",
                        )}`,
                    },
                },
            );

            return Object.values(response.data);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        async function getCars() {
            const cars = await getCarsData();
            return cars;
        }
        console.log("cars data is here");
        getCars().then((data) => setCars(data));
    }, [isPopupAddCarVisible, isModal, cars]);

    const clickOnEye = (id: string) => {
        const carsCopy = cars && [...cars];
        const newCars =
            carsCopy &&
            carsCopy.map((car) => {
                if (car.id === id) {
                    return { ...car, is_hidden: !car.is_hidden };
                }
                return car;
            });

        setCars(newCars);
    };

    console.log(cars);
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
                    {permissions.add_car && (
                        <button
                            className={styles["content__add-car"]}
                            onClick={() => setIsPopupAddCarVisible(true)}
                        >
                            Add car
                        </button>
                    )}

                    <ul className={styles.content__list}>
                        {cars &&
                            cars.map((car: ICar) => (
                                <CarItem
                                    key={car.id}
                                    id={car.id}
                                    name={car.name}
                                    number={car.number}
                                    is_hidden={car.is_hidden}
                                    clickOnEye={clickOnEye}
                                    permissions={permissions}
                                    setIsModal={setIsModal}
                                    isModal={isModal}
                                />
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

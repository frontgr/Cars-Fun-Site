import styles from "./AddCarPopup.module.scss";
import Close from "../../../../Assets/Delete.svg";
import { useState } from "react";
import axios from "axios";

export default function AddCarPopup({ setIsPopupAddCarVisible }: any) {
    const [photosArray, setPhotosArray] = useState<any[]>([]);

    const [formValues, setFormValues] = useState({
        name: "",
        number: "",
        type: "racer",
        speed_up: "",
        max_speed: "",
        description: "",
    });
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPhotosArray([...photosArray, reader.result]);
        };
        reader.readAsDataURL(file);
        event.target.value = "";
    };

    const handleFileRemove = (event: any) => {
        const imgToRemove = event.target.closest("div").querySelector("img");
        setPhotosArray(photosArray.filter((img) => img !== imgToRemove.src));
    };

    function handdleInputChange(event: any) {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value, // Update the state for the corresponding input
        }));
    }
    function handdleInputTypeChange(newType: string) {
        setFormValues((prevValues) => ({
            ...prevValues,
            ["type"]: newType,
        }));
    }
    function handleAddCar(e: any) {
        e.preventDefault();

        // Validate form fields
        const isFormValid =
            photosArray.length > 0 &&
            formValues.name.length > 0 &&
            formValues.number.length > 0 &&
            formValues.type &&
            formValues.speed_up &&
            formValues.max_speed &&
            formValues.description.length > 0;

        if (isFormValid) {
            // Prepare FormData
            const formData = new FormData();

            // Convert base64 strings to File objects
            const coverPhoto = base64ToFile(photosArray[0], "cover_photo.jpg");
            const additionalPhotos = photosArray
                .slice(1)
                .map((base64: string, index: number) =>
                    base64ToFile(base64, `additional_photo_${index + 1}.jpg`),
                );

            // Append text fields
            formData.append("name", formValues.name);
            formData.append("number", formValues.number);
            formData.append("type", formValues.type);
            formData.append("speed_up", formValues.speed_up);
            formData.append("max_speed", formValues.max_speed);
            formData.append("description", formValues.description);

            // Append photos
            formData.append("cover_photo", coverPhoto);
            additionalPhotos.forEach((photo: File) => {
                formData.append("photos", photo);
            });

            // Debugging: Log the FormData content
            formData.forEach((value, key) => {
                console.log(`${key}:`, value);
            });

            // Send the request
            axios
                .post("http://127.0.0.1:5000/panel/car", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token",
                        )}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log("Success:", res.data);
                })
                .catch((err) => {
                    if (err.response) {
                        console.error("Error Response:", err.response.data);
                        console.error("Status:", err.response.status);
                        console.error("Headers:", err.response.headers);
                    } else {
                        console.error("Error:", err.message);
                    }
                });
        } else {
            console.error("Form validation failed. Please check all fields.");
        }
    }

    // Function to convert base64 to File
    function base64ToFile(base64String: string, filename: string): File {
        const arr: string[] = base64String.split(",");
        const match: RegExpMatchArray | null = arr[0].match(/:(.*?);/);
        if (!match) {
            throw new Error("Invalid base64 string");
        }
        const mime: string = match[1];
        const bstr: string = atob(arr[1]);
        const n: number = bstr.length;
        const u8arr: Uint8Array = new Uint8Array(n);
        for (let i: number = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
    }

    return (
        <>
            <div className={styles["add-car-popup__overlay"]}></div>
            <div className={styles["add-car-popup"]}>
                <button
                    className={styles["add-car-popup__close"]}
                    onClick={() => setIsPopupAddCarVisible(false)}
                >
                    <img src={Close} alt="Close" />
                </button>
                <h2 className={styles["add-car-popup__heading"]}>
                    Add at least <span>1</span> photo. The first photo added
                    will be the <span>cover photo</span> of the car
                </h2>
                <form className={styles["add-car-popup__form"]}>
                    <div className={styles["add-car-popup__form-info"]}>
                        <input
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handdleInputChange}
                            placeholder={"Name of a car..."}
                            className={styles["add-car-popup__form-info-input"]}
                        />
                        <input
                            type="number"
                            name="number"
                            value={formValues.number}
                            onChange={handdleInputChange}
                            placeholder={"Number, if available..."}
                            className={`${styles["add-car-popup__form-info-input"]} 
                            ${styles["add-car-popup__form-info-input--number"]}`}
                        />
                        <div
                            className={`${styles["add-car-popup__form-info-input--role"]}`}
                        >
                            <input
                                type="radio"
                                id="Racer"
                                name="role"
                                value="Racer"
                                defaultChecked
                                onClick={() => {
                                    handdleInputTypeChange("racer");
                                }}
                            />
                            <label
                                htmlFor="Racer"
                                className={`${styles["add-car-popup__form-info-input"]}`}
                            >
                                Racer
                            </label>
                            <input
                                type="radio"
                                id="Other"
                                name="role"
                                value="Other"
                                onClick={() => {
                                    handdleInputTypeChange("other");
                                }}
                            />
                            <label
                                htmlFor="Other"
                                className={`${styles["add-car-popup__form-info-input"]}`}
                            >
                                Other
                            </label>
                        </div>
                        <input
                            type="number"
                            name="speed_up"
                            value={formValues.speed_up}
                            onChange={handdleInputChange}
                            placeholder={"0–100kph time..."}
                            className={styles["add-car-popup__form-info-input"]}
                        />
                        <input
                            type="number"
                            name="max_speed"
                            value={formValues.max_speed}
                            onChange={handdleInputChange}
                            placeholder={"Top speed / kmph......"}
                            className={styles["add-car-popup__form-info-input"]}
                        />
                        <textarea
                            placeholder="Description..."
                            name="description"
                            value={formValues.description}
                            onChange={handdleInputChange}
                            className={`${styles["add-car-popup__form-info-input"]} ${styles["add-car-popup__form-info-input--textarea"]}`}
                        ></textarea>
                    </div>
                    <div className={styles["add-car-popup__form-photos"]}>
                        {photosArray.map((photo) => (
                            <div
                                className={
                                    styles["add-car-popup__form-photos-img"]
                                }
                                onClick={handleFileRemove}
                            >
                                <img src={photo} alt="Car photo" />
                            </div>
                        ))}
                        <label
                            htmlFor="addPhotoForNewCar"
                            className={
                                styles["add-car-popup__form-photos-label"]
                            }
                        >
                            +
                        </label>
                        <input
                            type="file"
                            id="addPhotoForNewCar"
                            name="addPhotoForNewCar"
                            onChange={handleFileUpload}
                            accept=".png, .jpg, .jpeg"
                            className={
                                styles["add-car-popup__form-photos-input"]
                            }
                        />
                    </div>
                    <input
                        type="submit"
                        value="Add car"
                        onClick={handleAddCar}
                        className={styles["add-car-popup__add-button"]}
                    />
                </form>
            </div>
        </>
    );
}

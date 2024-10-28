import styles from "./Modal.module.scss";

export default function Modal(props: any) {
    console.log(props);
    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.modal}>
                {props.type === "addCarDone" && (
                    <p className={styles.modal__text}>Car added successfully</p>
                )}
                {props.type === "addCarFail" && (
                    <p className={styles.modal__text}>
                        Car adding failed. Try again
                    </p>
                )}
                {props.type === "addAdminDone" && (
                    <p className={styles.modal__text}>
                        Admin added successfully
                    </p>
                )}{" "}
                {props.type === "addAdminFail" && (
                    <p className={styles.modal__text}>
                        Admin added failed. Try again
                    </p>
                )}
                {props.type === "deleteAdminDone" && (
                    <p className={styles.modal__text}>
                        Are you sure you want to delete the admin?
                    </p>
                )}
                {props.type === "deleteCarDone" && (
                    <p className={styles.modal__text}>
                        Are you sure you want to delete the car?
                    </p>
                )}
                {(props.type === "addCarDone" ||
                    props.type === "addCarFail" ||
                    props.type === "addAdminDone" ||
                    props.type === "addAdminFail") && (
                    <button
                        onClick={() => props.setIsModal(["", false])}
                        className={styles.modal__button}
                    >
                        Close
                    </button>
                )}
                {props.type === "deleteAdminDone" && (
                    <div className={styles["modal__block"]}>
                        <button
                            className={styles.modal__button}
                            onClick={() => {
                                props.handdleDeleteButton(props.adminId);
                                props.setIsModal(["", false]);
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className={`${styles.modal__button} ${styles["modal__button--text"]}`}
                            onClick={() => props.setIsModal(["", false])}
                        >
                            No
                        </button>
                    </div>
                )}
                {props.type === "deleteCarDone" && (
                    <div className={styles["modal__block"]}>
                        <button
                            className={styles.modal__button}
                            onClick={() => {
                                props.handdleDeleteButton(props.carId);
                                props.setIsModal(["", false]);
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className={`${styles.modal__button} ${styles["modal__button--text"]}`}
                            onClick={() => props.setIsModal(["", false])}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

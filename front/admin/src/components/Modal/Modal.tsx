import styles from "./Modal.module.scss";

export default function Modal(props: any) {
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
                {(props.type === "addCarDone" ||
                    props.type === "addCarFail") && (
                    <button
                        onClick={() => props.setIsModal(["", false])}
                        className={styles.modal__button}
                    >
                        Close
                    </button>
                )}
            </div>
        </>
    );
}

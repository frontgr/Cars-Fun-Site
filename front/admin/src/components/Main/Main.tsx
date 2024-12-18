import styles from "./Main.module.scss";
import Logo from "../Logo/Logo";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Content from "../Pages/Content/Content";
import Analytics from "../Pages/Analytics/Analytics";
import Admins from "../Pages/Admins/Admins";

export default function Main() {
    const [page, setPage] = useState("Content");

    return (
        <div className={styles.main}>
            <nav className={styles.main__nav}>
                <div
                    className={styles["main__nav-logo"]}
                    onClick={() => setPage("Content")}
                >
                    <Logo location={"main"} />
                </div>
                <span className={styles["main__nav-logo-login"]}>
                    You logged as:{" "}
                    <span>{localStorage.getItem("cars_login")}</span>
                </span>
                <ul className={styles["main__nav-list"]}>
                    <li className={styles["main__nav-list-item"]}>
                        <Link
                            to="Content"
                            className={`
                                ${styles["main__nav-list-item-button"]}
                                ${
                                    page === "Content" &&
                                    styles["main__nav-list-item-button--active"]
                                }
                            `}
                            onClick={() => setPage("Content")}
                        >
                            <span>Content</span>
                            {page === "Content" && (
                                <div
                                    className={
                                        styles["main__nav-list-underline"]
                                    }
                                ></div>
                            )}
                        </Link>
                    </li>
                    <li className={styles["main__nav-list-item"]}>
                        <Link
                            to="Analytics"
                            className={`
                                ${styles["main__nav-list-item-button"]}
                                ${
                                    page === "Analytics" &&
                                    styles["main__nav-list-item-button--active"]
                                }
                            `}
                            onClick={() => setPage("Analytics")}
                        >
                            <span>Analytics</span>{" "}
                            {page === "Analytics" && (
                                <div
                                    className={
                                        styles["main__nav-list-underline"]
                                    }
                                ></div>
                            )}
                        </Link>
                    </li>
                    <li className={styles["main__nav-list-item"]}>
                        <Link
                            to="Admins"
                            className={`
                                ${styles["main__nav-list-item-button"]}
                                ${
                                    page === "Admins" &&
                                    styles["main__nav-list-item-button--active"]
                                }
                            `}
                            onClick={() => setPage("Admins")}
                        >
                            <span>Admins</span>
                            {page === "Admins" && (
                                <div
                                    className={
                                        styles["main__nav-list-underline"]
                                    }
                                ></div>
                            )}
                        </Link>
                    </li>
                    <li className={styles["main__nav-list-item"]}>
                        <Link
                            to="/"
                            className={`
                                ${styles["main__nav-list-item-button"]}
                                ${styles["main__nav-list-item-button--logout"]}
                            `}
                            onClick={() => {
                                document.cookie =
                                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                localStorage.clear();
                            }}
                        >
                            <span>Log out</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                {/* Default route */}
                <Route path="/" element={<Navigate to="Content" />} />

                {/* Routes */}
                <Route path="Content" element={<Content />} />
                <Route path="Analytics" element={<Analytics />} />
                <Route path="Admins" element={<Admins />} />
            </Routes>
        </div>
    );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom";

import "./styles/index.scss";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    { path: "/main/*", element: <Main /> },
    {
        path: "/Content",
    },
    {
        path: "/Analytics",
    },
    {
        path: "/Users",
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

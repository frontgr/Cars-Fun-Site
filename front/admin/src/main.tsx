import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/index.scss";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";

// Pages
import Content from "./components/Pages/Content/Content";
import Analytics from "./components/Pages/Analytics/Analytics";
import Users from "./components/Pages/Users/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    { path: "/main/*", element: <Main /> },
    {
        path: "/Content",
        element: <Content />,
    },
    {
        path: "/Analytics",
        element: <Analytics />,
    },
    {
        path: "/Users",
        element: <Users />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

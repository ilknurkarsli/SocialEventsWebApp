import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDeatils from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import Notfound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import PorfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[]=[
    {
        path: "/",
        element: <App/>,
        children:[
            {element: <RequireAuth/>, children: [
                {path: "activities", element: <ActivityDashboard/>},
                {path:"createactivity", element:<ActivityForm key="create"/>},
                {path: "activities/:id", element: <ActivityDeatils/>},
                {path: "manage/:id", element: <ActivityForm key="manage"/>},
                {path: "profiles/:username", element: <PorfilePage key="manage"/>},
                {path: "errors", element: <TestErrors />},
            ]},
            {path: "not-found", element: <Notfound />},
            {path: "server-error", element: <ServerError />},
            {path: "*", element: <Navigate replace to="/not-found" />},
        ]
    }
]
export const router=createBrowserRouter(routes);
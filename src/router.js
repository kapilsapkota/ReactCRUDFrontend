import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Users from "./views/Users";

const router = createBrowserRouter([
    //loggedUser Admin
    {
        path: '/',
        element: <DefaultLayout/>,
        children : [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path : '/users',
                element : <Users />
            }
        ]
    },
    //LoginSignUp
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path : '/login',
                element : <Login />
            },
            {
                path : '/signup',
                element : <SignUp />
            },
        ]
    },
    {
        path : '*',
        element : <NotFound />
    },
])

export default router;
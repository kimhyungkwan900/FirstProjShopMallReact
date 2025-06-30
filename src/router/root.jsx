import MainPage from "../pages/MainPage";
import LoginPage from "../pages/common/Login/LoginPages"
import { createBrowserRouter } from "react-router-dom";

const root = createBrowserRouter([
    {
        path:"/",
        element : <MainPage/>
    },

    {
        path:"/login",
        element : <LoginPage/>
    }
])

export default root;
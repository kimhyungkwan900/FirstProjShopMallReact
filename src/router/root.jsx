import LoginPage from "../pages/common/Login/LoginPage"
import { createBrowserRouter } from "react-router-dom";

const root = createBrowserRouter([
    {
        path:"/login",
        element : <LoginPage/>
    }
])

export default root;
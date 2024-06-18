import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Terms from "../Page/Terms.jsx/Terms";
import Disclaimer from "../Page/Disclaimer/Disclaimer";
import About from "../Page/About/About";
import Privacy from "../Page/Privacy/Privacy";


export const router = createBrowserRouter([{
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/terms",
            element: <Terms/>
        },
        {
            path: "/disclaimer",
            element: <Disclaimer/>
        },
        {
            path: "/about",
            element: <About/>
        },
        {
            path: "/privacy",
            element: <Privacy/>
        },
       
        
       ]
}])
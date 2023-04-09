import React from 'react'
import jwt from "jsonwebtoken"
import {Cookies} from "react-cookie"
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
        const cookies = new Cookies();
        let token = cookies.get("token")
        jwt.verify(token, 'my_secret_key', function (err) {
            if (err) {
                console.log("NOT VALID JWT token")
                cookies.remove("token", {path: "/"})
                token = false
            }
        });
        if (token) {
            return children;
        } else {
            return <Navigate to={"/auth/signin"} replace/>
        }
        // } else {
        //     if (path === '/login' || path === '/register') {
        //         return children;
        //     } else {
        //         return <Navigate to={"/login"} replace/>;
        //     }
        // }
    }
;

export default ProtectedRoute
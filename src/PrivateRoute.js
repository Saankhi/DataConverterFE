import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"



export default function PrivateRoute(props) {

    const { Component } = props
    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem('isLoggedIn')
        if (!login) {
            navigate('/')
        }
    },[])

    return (
        <Component />
    )
}
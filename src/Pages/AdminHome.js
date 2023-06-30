import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"


export default function AdminHome() {

    const navigate = useNavigate();

    const toTemplate = () => {
        navigate('/template')
    }

    return (
        <>
            <Button style={{ backgroundColor: '#12B5B0', color: '#fff', height: '50px', borderRadius: '5px', border: "none", float: 'right', margin: '2rem' }} onClick={() => navigate('/userdetails')}>Manage Users</Button>
            <div style={{ textAlign: 'center', marginTop: '200px' }}>

                <h1>Welcome to <b style={{ color: "Red" }} >SAiS</b>.Take a moment and Explore our application.</h1>
                <h4>DATA CONVERTER</h4>
                <p>Use this application to convert your file</p>
                <button onClick={toTemplate} style={{ width: '450px', backgroundColor: '#12B5B0', height: '50px', borderRadius: '5px', border: "none", color: '#fff' }}>Click here</button>
            </div>
        </>
    )
}
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
            <div style={{ textAlign: 'center', marginTop: '200px' }}>
                <Button style={{ backgroundColor: '#12B5B0', color: '#fff', height: '50px', borderRadius: '5px', border: "none" }} onClick={() => navigate('/userdetails')}>Manage Users</Button>
                <h1>WELCOME TO OUR <b style={{ color: "#12B5B0" }} >WEBSITE</b></h1>
                <h4>DATA CONVERTER</h4>
                <p>Use this website to convert your file</p>
                <button onClick={toTemplate} style={{ width: '450px', backgroundColor: '#12B5B0', height: '50px', borderRadius: '5px', border: "none", color: '#fff' }}>Click here</button>
            </div>
        </>
    )
}
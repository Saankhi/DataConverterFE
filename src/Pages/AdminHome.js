import React from "react"
import Header from "../Components/Header"


export default function AdminHome() {
    return (
        <>
            {/* <Header /> */}
            <div style={{ textAlign: 'center', marginTop: '200px' }}>
                <h1>WELCOME TO OUR <b style={{ color: "#12B5B0" }} >WEBSITE</b></h1>
                <h4>DATA CONVERTER</h4>
                <p>Use this website to convert your file</p>
                <button style={{ width: '450px', backgroundColor: '#12B5B0', height: '50px', borderRadius: '5px', border:"none", color: '#fff' }}>Click here</button>
            </div>
        </>
    )
}
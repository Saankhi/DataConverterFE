import React from "react"
import Header from "../Components/Header"

export default function AdminAboutUs() {
    return (
        <>
            <Header />
            <div style={{ textAlign: 'center', marginTop: '180px' }}>
                <h1 style={{ color: '#12B5B0', fontSize: '50px', marginBottom: '40px' }}>ABOUT US</h1>
                <p style={{ fontSize: '20px' }}>Data conversion is the process of translating one data format to another for<br />
                    the purpose of enabling file, application, or database to execute properly.</p>
            </div>
        </>
    )
}
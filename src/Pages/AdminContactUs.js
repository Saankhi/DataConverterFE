import React from "react";
import Header from "../Components/Header";

export default function AdminContactUs() {
    return (
        <>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: '#12B5B0', fontSize: '50px', marginBottom: '40px' }}>CONTACT US</h1>
                <p style={{ fontSize: '20px' }}>Use this form to contact us about Queris</p>
                <form className="form">
                    <div>
                        <label>Enter Your Name</label><br />
                        <input type="text" />
                    </div>
                    <div>
                        <label>Enter Your Email Address</label><br />
                        <input type="email" />
                    </div>
                    <div>
                        <label>Enter Your Phone Number</label><br />
                        <input type="number" />
                    </div>&nbsp;<br />
                    <input type="text" /><br />
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <button style={{ marginRight: '40px', fontSize: '20px', borderRadius: '10px', width: '90px' }}>Cancel</button>
                        <button style={{ backgroundColor: '#12B5B0', color: '#fff', fontSize: '20px', borderRadius: '10px', width: '90px' }}>Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}

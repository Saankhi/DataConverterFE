import React from "react";
import { Form, Button } from "react-bootstrap"
import Header from "../Components/Header";

export default function AdminContactUs() {
    return (
        <>
            {/* <Header /> */}
            <div>
                <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                    <h1 style={{ color: '#12B5B0', fontSize: '50px' }}>CONTACT US</h1>
                    <p style={{ fontSize: '20px' }}><b>Use this form to contact us about Queries</b></p>
                </div>

                <Form style={{ width: "30rem", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", paddingTop: "2rem" }}>
                    <Form.Group>
                        <Form.Label style={{ textAlign: "end" }}>Enter Your Name</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Enter Your Email Address</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Enter Your Mobile Number</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group><br />
                    <Form.Group >
                        <Form.Control as="textarea" rows={2} placeholder="Please mention your query here" />
                    </Form.Group>

                    <div style={{ display: "flex", padding: "2rem", justifyContent: "space-around" }}>
                        <Button style={{ backgroundColor: "#D9D9D9", border: "none", color: "black", width: "8rem" }}>Cancel</Button>
                        <Button style={{ backgroundColor: "#12B5B0", border: "none", width: "8rem" }}>Send</Button>
                    </div>
                </Form>




            </div>
        </>
    )
}

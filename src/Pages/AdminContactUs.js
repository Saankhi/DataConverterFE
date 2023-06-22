import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import Swal from "sweetalert2";
import { AiOutlineConsoleSql } from "react-icons/ai";

export default function AdminContactUs() {

    const data = JSON.parse(localStorage.getItem('userInfo'))
    const dept = data[0].department

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [query, setQuery] = useState()



    const sendMail = async () => {

        const body = {
            text: `A Query request has been made. Please take action immediately.Sender Details : 
                 User Name: ${name}
                 Mobile Number:  ${mobile} 
                 Query: ${query}
                 
                 Regards,
                 ${email}, Admin at ${dept}
                 `
        }

        await axios.post("http://localhost:1827/auth/contactus", body)
        console.log(body)
            .then((response) => {
                console.log(body)
                console.log(response)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your query has been sent',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to send your query.Please try again after sometime',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })
    }




    return (
        <>
            <div>
                <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                    <h1 style={{ color: '#12B5B0', fontSize: '50px' }}>CONTACT US</h1>
                    <p style={{ fontSize: '20px' }}><b>Use this form to contact us about Queries</b></p>
                </div>

                <Form style={{ width: "30rem", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", paddingTop: "1rem" }}>
                    <Form.Group>
                        <Form.Label style={{ textAlign: "end" }}>Enter Your Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Enter Your Email Address</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Enter Your Mobile Number</Form.Label>
                        <Form.Control type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </Form.Group><br />
                    <Form.Group >
                        <Form.Control as="textarea" rows={2} placeholder="Please mention your query here" value={query} onChange={(e) => setQuery(e.target.value)} />
                    </Form.Group>

                    {name && mobile && email && query ? <Button style={{ backgroundColor: "#12B5B0", border: "none", width: "8rem", marginTop: "2rem" }} onClick={sendMail}>Send</Button> : <Button style={{ backgroundColor: "#12B5B0", border: "none", width: "8rem", marginTop: "2rem" }} disabled >Send</Button>}

                </Form>

            </div>
        </>
    )
}

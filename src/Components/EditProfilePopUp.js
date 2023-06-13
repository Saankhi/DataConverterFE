import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';


export default function EditProfilePopUp(props) {


    const updateProfile = async () => {

        const body = {
            firstName: "",
            lastName: "",
            password: "",
            mobile: "",
            email: ""
        }
        const result = await axios.put("", body)
    }
    return (
        <>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body className="ebody">
                    <img src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg" width='200px' height='200px' style={{ borderRadius: '100px', marginTop: '100px', marginRight: '80px', marginLeft: '30px' }} />
                    <div style={{ display: 'flex', marginLeft: '80px' }}>
                        <Form>
                            <Form.Group >
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                        </Form>

                        <Button style={{ backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>Update</Button>
                    </div>

                </Modal.Body>
            </Modal>


        </>
    )
}
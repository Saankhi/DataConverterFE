import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';


export default function EditProfilePopUp(props) {

    // const admin = JSON.parse(localStorage.getItem('userInfo'))
    const admin = props.adminInfo

    const [firstname, setfirstname] = useState(admin[0].firstName);
    const [lastname, setlastname] = useState(admin[0].lastName);
    const [role, setrole] = useState(admin[0].role);
    const [email, setemail] = useState(admin[0].email)
    const [password, setpassword] = useState(admin[0].password)
    const [mobile, setMobile] = useState(admin[0].mobile)



    const updateProfile = async () => {

        const body = {
            firstName: firstname,
            lastName: lastname,
            password: password,
            mobile: mobile,
            Role: role,
            email: email
        }
        const result = await axios.put("http://localhost:1827/auth/editprofile", body)
        try {
            console.log(result.data.message)
            console.log(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>

            <Modal
                {...props}
                size="lg"

                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton style={{ backgroundColor: 'skyblue' }}>

                </Modal.Header>
                <Modal.Body className="ebody">
                    <div>
                        <img src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg" width='200px' height='200px' style={{ borderRadius: '100px', marginTop: '100px', marginRight: '80px', marginLeft: '30px' }} />
                    </div>

                    <div style={{ display: 'flex', marginLeft: '80px', }}>
                        <Form>
                            <Form.Group >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" value={role} onChange={(e) => setrole(e.target.value)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => setemail(e.target.value)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" value={password} onChange={(e) => setpassword(e.target.value)} />
                            </Form.Group><br />
                            <Button onClick={updateProfile} style={{ backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem", width: '150px' }}>Update</Button>
                        </Form>


                    </div>

                </Modal.Body>
            </Modal>


        </>
    )
}
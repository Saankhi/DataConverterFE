import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios"
import * as TiIcons from "react-icons/ti"
import * as RiIcons from "react-icons/ri"
import Swal from "sweetalert2";

const Userspopup = (props) => {

    const [fName, setFName] = useState(null)
    const [lName, setLName] = useState(null)
    const [email, setEmail] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [password, setPassword] = useState(null)
    const [confrimPass, setConfirmPass] = useState(null)
    const [depart, setDepart] = useState(null)

    

    const handelComparePass = (e) => {

        setConfirmPass(e.target.value)
    }

    const onSignUp = async () => {

        const body = {
            firstName: fName,
            lastName: lName,
            email: email,
            mobile: mobile,
            password: password,
            role: "Admin",
            department: depart
        }


        try {
            await axios.post("http://localhost:1827/auth/signup", body)
            Swal.fire({
                title: 'Admin added successfully',
                icon: 'success',
                confirmButtonColor: 'green',
                confirmButtonText: 'Okay'
            }).then((result) => {
                if (result.isConfirmed) {
                    props.onHide();
                }
            }).catch((err) => console.log(err))

        } catch (err) {
            if (err.response.data.error.code === "ER_DUP_ENTRY") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mobile number already in use!Please check.'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!Please try again after sometime'
                })
            }
        }

    }
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body style={{ height: '30rem' }}>
                <Form className="form" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>

                    <h3 style={{ color: "#12B5B0", textAlign: "left", marginLeft: "9rem" }}>Create Admin</h3>
                    <div className="group-1" style={{ display: "flex" }}>
                        <Form.Group style={{ width: "15rem", marginRight: "2rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>First Name</Form.Label>
                            <Form.Control type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="First Name" style={{ height: "2rem" }} />
                        </Form.Group>

                        <Form.Group style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>Last Name</Form.Label>
                            <Form.Control type="text" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" style={{ height: "2rem" }} />
                        </Form.Group>
                    </div>

                    <div className="group-2" style={{ display: "flex" }}>
                        <Form.Group controlId="formBasicEmail" style={{ width: "15rem", marginRight: "2rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" style={{ height: "2rem" }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicText" style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>Mobile</Form.Label>
                            <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile Number" style={{ height: "2rem" }} />
                        </Form.Group>
                    </div>

                    <div className="group-3" style={{ display: "flex" }}>
                        <Form.Group style={{ width: "15rem", marginRight: "2rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>Create Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ height: "2rem" }} />
                        </Form.Group>

                        <Form.Group style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control type="password" value={confrimPass} onChange={(e) => handelComparePass(e)} placeholder="Re-enter password" style={{ height: "2rem" }} />
                                {confrimPass ? (password === confrimPass ? <TiIcons.TiTick style={{ fontSize: "2rem", color: "green" }} /> : <RiIcons.RiCloseFill style={{ fontSize: "2rem", color: "red" }} />) : null}
                            </InputGroup>
                        </Form.Group>
                    </div>

                    <div className="group-3" style={{ display: "flex" }}>
                        <Form.Group style={{ width: "15rem", marginRight: "2rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>Role</Form.Label>
                            <Form.Control value="Admin" style={{ height: "2rem" }}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem", color: 'black' }}>Department</Form.Label>
                            <Form.Control type="text" value={depart} onChange={(e) => setDepart(e.target.value)} placeholder="Department" style={{ height: "2rem" }} />
                        </Form.Group>
                    </div>

                    {fName && lName && email && mobile && password && password === confrimPass && depart ?
                        <Button variant="success" onClick={onSignUp} style={{ marginTop: "2rem", width: "10rem", marginLeft: "10rem", marginBottom: "2rem" }}>Add User</Button>
                        : <Button variant="success" disabled style={{ marginTop: "2rem", width: "10rem", marginLeft: "10rem", marginBottom: "2rem" }}>Add User</Button>}

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Userspopup;
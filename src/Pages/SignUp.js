import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import * as TiIcons from "react-icons/ti"
import * as RiIcons from "react-icons/ri"


export default function SignUp() {


    const [fName, setFName] = useState(null)
    const [lName, setLName] = useState(null)
    const [email, setEmail] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [password, setPassword] = useState(null)
    const [confrimPass, setConfirmPass] = useState(null)
    const [role, setRole] = useState(null)
    const [depart, setDepart] = useState(null)
    const navigate = useNavigate();



    const handelComparePass = (e) => {

        setConfirmPass(e.target.value)
        if (password !== e.target.value) {
            console.log("Passwords dont match")
        } else {
            console.log("Passwords match")
        }
    }

    const onSignUp = async () => {

        const body = {
            firstName: fName,
            lastName: lName,
            email: email,
            mobile: mobile,
            password: password,
            role: role,
            department: depart
        }
        const result = await axios.post("http://localhost:1827/auth/signup", body)

        try {
            console.log(result.data.message)
            navigate('/')
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <>
            <div className="signup">

                <p style={{ textAlign: "end", color: "White", marginRight: "2rem", paddingTop: "2rem" }}>Already have an account?<Link to="/" style={{ color: "#12B5B0" }}>Sign in here</Link></p>

                <Form className="form" style={{ marginLeft: "25rem", marginTop: "2rem" }}>

                    <h3 style={{ color: "#12B5B0", textAlign: "left", marginLeft: "9rem" }}>Create An Account</h3>
                    <div className="group-1" style={{ display: "flex" }}>
                        <Form.Group style={{ width: "15rem", marginRight: "2rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>First Name</Form.Label>
                            <Form.Control type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="First Name" style={{ height: "2rem" }} />
                        </Form.Group>

                        <Form.Group style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>Last Name</Form.Label>
                            <Form.Control type="text" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" style={{ height: "2rem" }} />
                        </Form.Group>
                    </div>

                    <div className="group-2" style={{ display: "flex" }}>
                        <Form.Group controlId="formBasicEmail" style={{ width: "15rem", marginRight: "2rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" style={{ height: "2rem" }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicText" style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>Mobile</Form.Label>
                            <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile Number" style={{ height: "2rem" }} />
                        </Form.Group>
                    </div>

                    <div className="group-3" style={{ display: "flex" }}>
                        <Form.Group style={{ width: "15rem", marginRight: "2rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>Create Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ height: "2rem" }} />
                        </Form.Group>

                        <Form.Group style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control type="password" value={confrimPass} onChange={(e) => handelComparePass(e)} placeholder="Re-enter password" style={{ height: "2rem" }} />
                                {confrimPass ? (password === confrimPass ? <TiIcons.TiTick style={{ fontSize: "2rem", color: "green" }} /> : <RiIcons.RiCloseFill style={{ fontSize: "2rem", color: "red" }} />) : null}
                            </InputGroup>
                        </Form.Group>
                    </div>

                    <div className="group-3" style={{ display: "flex" }}>
                        <Form.Group style={{width: "15rem",marginRight: "2rem"}}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>Choose Role</Form.Label>
                            <Form.Select value={role} onChange={(e) => setRole(e.target.value)} style={{  height: "2rem" }}>
                                <option>Select Your Role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group style={{ width: "15rem" }}>
                            <Form.Label style={{ color: "White", marginTop: "1rem", fontSize: "0.9rem" }}>Department</Form.Label>
                            <Form.Control type="text" value={depart} onChange={(e) => setDepart(e.target.value)} placeholder="Department" style={{ height: "2rem" }} />
                        </Form.Group>
                    </div>

                    {fName && lName && email && mobile && password && password === confrimPass && role && depart ?
                        <Button variant="success" onClick={onSignUp} style={{ marginTop: "2rem", width: "10rem", marginLeft: "10rem", marginBottom: "2rem" }}>Sign Up</Button>
                        : <Button variant="success" disabled style={{ marginTop: "2rem", width: "10rem", marginLeft: "10rem", marginBottom: "2rem" }}>Sign Up</Button>}

                </Form>

            </div>
        </>
    )
}
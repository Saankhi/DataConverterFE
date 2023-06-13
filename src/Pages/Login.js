import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap"
import axios from "axios"


export default function Login() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null)
    const navigate = useNavigate();

    const onLogin = async () => {

        const body = {
            email: email,
            password: password
        }
        const isPresent = await axios.post("http://localhost:1827/auth/signin", body)
        try {
            console.log(isPresent.data.details)
            if (isPresent?.data?.details[0]?.role !== "Admin") {
                localStorage.setItem('isLoggedIn' , true)
                localStorage.setItem('userInfo', JSON.stringify(isPresent.data.details))
                navigate('/userhome')
            } else {
                localStorage.setItem('isLoggedIn' , true)
                navigate('/adminhome')
                localStorage.setItem('userInfo', JSON.stringify(isPresent.data.details))
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className="login" style={{ display: "flex" }}>
                <div className="image-div" style={{ flex: 1 }}>
                    <img src="./photo1.png" width="90%" style={{ height: "100vh" }} />
                </div>

                <div className="login-form" style={{ margin: "5rem 5rem 0rem" }}>
                    <h4 style={{ textAlign: "center" }}>Login to your account</h4>
                    <Form >
                        <Form.Group style={{ display: "flex", width: "20rem", marginTop: "4rem", marginBottom: "1rem" }}>
                            <Form.Label style={{ marginTop: "0.5rem", marginRight: "2.2rem" }}>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={{ height: "3rem" }} />
                        </Form.Group>

                        <Form.Group style={{ display: "flex", width: "20rem", marginBottom: "2rem" }}>
                            <Form.Label style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" style={{ height: "3rem" }} />
                        </Form.Group>

                        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "2rem" }}>
                            <Form.Check label="Remember Me" />
                            <Link>Forgot Password?</Link>
                        </div>

                        {email && password ?
                            <Button variant="success" onClick={onLogin} style={{ width: "10rem", marginBottom: "0.5rem", marginLeft: "4rem" }}>Login</Button>
                            : <Button variant="success" style={{ width: "10rem", marginBottom: "0.5rem", marginLeft: "4rem" }} disabled>Login</Button>}

                        <h6>Don't have an account? <Link to="/signup" style={{ color: "#12B5B0" }}>Sign Up Now</Link>
                        </h6>
                    </Form>
                </div>
            </div>
        </>
    )
}
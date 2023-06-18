import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Button } from 'react-bootstrap';
import * as CgIcons from "react-icons/cg"
import ProfilePopUp from "./ProfilePopUp";


export default function Header() {

    const [open, setOpen] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    return (
        <>

            <Navbar expand="lg" style={{ backgroundColor: "black" }}>
                <Container fluid>
                    <img src='Group1.png' style={{ height: "3rem", width: "3rem" }} />

                    <Navbar.Brand style={{ color: "white", fontSize: "2rem" }}>Data Converter</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>

                        <Nav>
                            <Nav className="me-auto">
                                <Nav.Link href="/adminhome"><Button variant="light" style={{ backgroundColor: "black", color: "white" }}>Home</Button></Nav.Link>
                                <Nav.Link href="/mytemplates"><Button variant="light" style={{ backgroundColor: "black", color: "white" }}>My Templates</Button></Nav.Link>
                                <Nav.Link href="/aboutus"><Button variant="light" style={{ backgroundColor: "black", color: "white" }}>About Us</Button></Nav.Link>
                                <Nav.Link href="/contactus"><Button variant="light" style={{ backgroundColor: "black", color: "white" }}>Contact Us</Button></Nav.Link>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <CgIcons.CgProfile onClick={() => setOpen(true)} style={{ width: "4rem", color: "white", height: "2.5rem" }} />
                                    <ProfilePopUp
                                        show={open}
                                        onHide={() => setOpen(false)}
                                    />
                                    {/* <p style={{color:"white"}}>Profile</p> */}
                                </div>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
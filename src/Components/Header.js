import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


export default function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark" >
                <Container > 
                    <Navbar.Brand href="#home" style={{fontSize:"2.5rem"}}>
                        <img
                            alt=""
                            src="/Group1.png"
                            width="50"
                            height="50"
                            style={{marginBottom:"1rem" , marginRight:"0.5rem"}}
                        />
                        Data Converter
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}
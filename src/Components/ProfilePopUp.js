import React, { useState, useEffect } from "react";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import EditProfilePopUp from "./EditProfilePopUp";

export default function ProfilePopUp(props) {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [adminInfo, setAdminInfo] = useState([])



    useEffect(() => {
        // adminDetails();
    }, [adminInfo])



    const adminDetails = async () => {

        const details = JSON.parse(localStorage.getItem('userInfo'))
        const key = details[0].email

        const result = await axios.get("http://localhost:1827/auth/allusers/" + key)
        try {
            setAdminInfo(result.data.details)
        } catch (err) {
            console.log("Error retreiving the details")
        }

    }



    return (

        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal"
            >
                <Modal.Header closeButton style={{ backgroundColor: 'skyblue' }}>
                </Modal.Header>
                <Modal.Body className="mbody">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} >
                        <div style={{ display: 'flex', flexDirection: "column", marginLeft: '0px' }}>
                            <img src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg" width='200px' height='200px' style={{ borderRadius: '100px', marginTop: '50px', marginBottom: '30px' }} />
                            {adminInfo.map((prof) => {
                                return (
                                    <><div style={{ display: 'flex' }}>
                                        <div>
                                            <p>{prof.firstName} {prof.lastName}</p>
                                            <p>{prof.role}</p>
                                        </div>
                                        <div style={{ marginLeft: '250px' }}>
                                            <p>Mobile:{prof.mobile}</p>
                                            <p>Email:{prof.email}</p>
                                            <p>Password:{prof.password}</p>
                                        </div>
                                    </div>
                                    </>
                                )
                            })}

                        </div>

                    </div>
                    <Button variant="primary"
                        style={{ marginLeft: '350px', width: '200px', borderRadius: '10px', backgroundColor: '#12B5B0', marginBottom: '30px' }}
                        onClick={() => { setModalShow(true) }}>

                        Edit Profile
                    </Button>
                    <EditProfilePopUp
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        adminInfo={adminInfo}
                    />
                </Modal.Body>

            </Modal>
        </>



    )
}

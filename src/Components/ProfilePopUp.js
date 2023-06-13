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

    // const click = () => {
    //     navigate('/Editprofile')
    // }

    useEffect(() => {
        adminDetails();
    }, [])


    const adminDetails = () => {
        const admin = JSON.parse(localStorage.getItem('adminInfo'))
        if (admin) setAdminInfo(admin)
    }


    return (

        adminInfo.length > 0 ? (<>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal"
            >

                <Modal.Body className="mbody">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} >
                        <div style={{ display: 'flex', flexDirection: "column", marginLeft: '0px' }}>
                            <img src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg" width='200px' height='200px' style={{ borderRadius: '100px', marginTop: '50px', marginBottom: '30px' }} />
                            <p>{adminInfo[0].firstName} {adminInfo[0].lastName}</p>
                            <p>{adminInfo[0].role}</p>
                        </div>
                        <div style={{ marginTop: '200px' }}>
                            <p>Mobile:{adminInfo[0].mobile}</p>
                            <p>Email:{adminInfo[0].email}</p>
                            <p>Password:*********</p>
                        </div>
                    </div>
                    <Button variant="primary"
                        style={{ marginLeft: '350px', width: '200px', borderRadius: '10px', backgroundColor: '#12B5B0', marginBottom: '30px' }}
                        onClick={() => setModalShow(true)}>
                        Edit Profile
                    </Button>
                    {/* <EditProfilePopUp
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> */}
                </Modal.Body>

            </Modal>
        </>) : null



    )
}

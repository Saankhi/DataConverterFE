import React, { useState, useEffect } from "react";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import EditProfilePopUp from "./EditProfilePopUp";
import * as AiIcons from "react-icons/ai"
import Swal from "sweetalert2";

export default function ProfilePopUp(props) {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [adminInfo, setAdminInfo] = useState([])



    useEffect(() => {
        adminDetails();
    }, [modalShow])



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


    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }
    const logOut = () => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
      
        swalWithBootstrapButtons.fire({
          title: 'Logging out',
            text: 'Are you sure to log out ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Logged out!',
              'You have successfully loggedout.',
              'success'
            )
            handleLogout()
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
                'Your logout is failed',
                'error'
            )
          }
        })
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
                    <h3>Profile</h3>
                </Modal.Header>
                <Modal.Body className="mbody">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} >
                        <div style={{ display: 'flex', flexDirection: "column", marginLeft: '0px' }}>
                            {/* <img src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg" width='200px' height='200px' style={{ borderRadius: '100px', marginTop: '50px', marginBottom: '30px' }} /> */}
                            {adminInfo.map((prof) => {
                                return (
                                    <><div style={{ display: 'flex' }}>
                                        <div>
                                            <p><b>Name:</b> {prof.firstName} {prof.lastName}</p>
                                            <p><b>Role:</b> {prof.role}</p>
                                            <p><b>Department:</b> {prof.department}</p>
                                        </div>
                                        <div style={{ marginLeft: '100px' }}>
                                            <p><b>Mobile:</b> {prof.mobile}</p>
                                            <p><b>Email:</b> {prof.email}</p>
                                            <p><b>Password:</b> {prof.password}</p>
                                        </div>
                                    </div>
                                    </>
                                )
                            })}

                        </div>

                    </div>
                    <div style={{justifyContent:'space-between', display:'flex'}}>
                    
                    <div>
                    <Button variant="primary"
                        style={{ marginLeft: '300px', width: '140px', borderRadius: '10px', backgroundColor: '#12B5B0', }}
                        onClick={() => { setModalShow(true) }}>

                        Edit Profile
                    </Button>
                    <EditProfilePopUp
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        adminInfo={adminInfo}
                    />
                    </div>
                    <div style={{fontSize:'30px'}}>
                    <AiIcons.AiOutlinePoweroff onClick={logOut} />
                    </div>
                    </div>
                    
                </Modal.Body>
                
            </Modal>
        </>



    )
}

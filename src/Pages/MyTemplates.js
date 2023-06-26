import React, { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";



export default function MyTemplates() {

    const [lgShow, setLgShow] = useState(false);
    const [mappings, setMappings] = useState([]);
    const [mappedHeaders, setMappedHeaders] = useState({})
    const navigate = useNavigate();

    const onHandleClick = () => {
        navigate("/template")
    }

    useEffect(() => {
        getMappings();
    }, [])


    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const key = userInfo[0].department


    const getMappings = async () => {
        const result = await axios.get("http://localhost:1827/header/getmappings/" + key)
        try {
            setMappings(result.data.mappingData)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!Please try again after sometime.',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }


    const getMappedHeaders = async (ipFile, opFile) => {

        const body = {
            dept: key,
            ip: ipFile,
            op: opFile
        }

        const result = await axios.post("http://localhost:1827/header/getmappedHeaders", body)
        try {
            setMappedHeaders(result.data.mappingData)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!Please try again after sometime.',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    }

    return (
        <>
            <div style={{ float: 'right', margin: '20px 20px' }}>
                <button style={{ backgroundColor: '#12B5B0', width: '200px', height: '50px', borderRadius: '20px', color: "white", border: "none", fontSize: '18px' }} onClick={onHandleClick}>Create New Template</button>
            </div>
            <h2 style={{ margin: '50px' }}>My Templates</h2>
            <div className="container" style={{ overflowY: "scroll", maxHeight: "calc(100vh - 159px)" }}>
                {mappings.length > 0 ? <Table>
                    <thead style={{ border: '1px solid black', borderRadius: '10px' }}>

                        <tr>
                            <th style={{ color: '#12B5B0' }}>Input File Name</th>
                            <th style={{ color: '#12B5B0' }}>Output File Name</th>
                            <th style={{ color: '#12B5B0' }}>Mapping</th>
                        </tr>

                    </thead>
                    <tbody>

                        {mappings.map((mapping) => {
                            const ipFile = mapping.ipFile
                            const opFile = mapping.opFile
                            return (
                                <>
                                    <tr style={{ margin: '20px' }}>
                                        <td>{ipFile}</td>
                                        <td>{opFile}</td>
                                        <td>
                                            <Button
                                                onClick={() => { setLgShow(true); getMappedHeaders(ipFile, opFile) }}
                                                variant="light"
                                                style={{ backgroundColor: '#12B5B0', color: 'white' }}
                                            >
                                                View Format
                                            </Button>
                                            <Modal
                                                size="lg"
                                                show={lgShow}
                                                onHide={() => setLgShow(false)}
                                                aria-labelledby="example-modal-sizes-title-lg"
                                            >
                                                <Modal.Header closeButton>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                        <div><h4 style={{ color: '#12B5B0' }}>Input Field</h4><br />
                                                            {
                                                                Object.entries(mappedHeaders).map(
                                                                    (arr) => {

                                                                        return <p>{arr[1].join(', ')}<AiIcons.AiOutlineArrowRight style={{ fontSize: '1rem', margin: 'auto', marginLeft: '2rem' }} /></p>
                                                                    }
                                                                )
                                                            }
                                                        </div>
                                                        <div>
                                                            <h4 style={{ color: '#12B5B0' }}>Output Field</h4><br />
                                                            {
                                                                Object.entries(mappedHeaders).map(
                                                                    (arr) => {
                                                                        return <p>{arr[0]}</p>
                                                                    }
                                                                )
                                                            }


                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </td>
                                    </tr>
                                </>
                            )

                        })}

                    </tbody>
                </Table> : <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}><b>No mappings yet! Create one by <Link to="/mapping" style={{ color: "#12B5B0" }}>clicking here.</Link></b></p>}

            </div>
        </>
    )
}
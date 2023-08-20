import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";


export default function MyTemplates() {


    const navigate = useNavigate();
    const [lgShow, setLgShow] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [templateHeaders, setTemplateHeaders] = useState([])

    const onHandleClick = () => {
        navigate("/template")
    }


    useEffect(() => {
        getTemplates();
    }, [])


    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const key = userInfo[0].department


    const getTemplates = async () => {
        const result = await axios.get("http://localhost:1827/header/allfiles/" + key)
        try {
            setTemplates(result.data.fileTypeDetails)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!Please try again after sometime.',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }


    const getTemplatesHeaders = async (key) => {

        try {
            const result = await axios.get("http://localhost:1827/header/allheaders/" + key)
            const updatedResult = result.data.headersDetails.map((header) => {
                return header.headerValues;
            })
            setTemplateHeaders(updatedResult);
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
                {templates.length > 0 ? <Table>
                    <thead style={{ border: '1px solid black', borderRadius: '10px' }}>

                        <tr>
                            <th style={{ color: '#12B5B0' }}>S.No</th>
                            <th style={{ color: '#12B5B0' }}>Template Name</th>
                            <th style={{ color: '#12B5B0' }}>Template Type</th>
                            <th style={{ color: '#12B5B0' }}>Template Format</th>
                            <th style={{ color: '#12B5B0' }}>View Details</th>
                        </tr>

                    </thead>
                    <tbody>

                        {templates.map((template, idx) => {
                            const tempName = template.fileName

                            var fileFormat = "";
                            switch (template.fileFormat) {
                                case ".csv":
                                    fileFormat = "CSV";
                                    break;
                                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                    fileFormat = "XLSX";
                                    break;
                                default:
                                    break;
                            }

                            return (
                                <>
                                    <tr style={{ margin: '20px' }}>
                                        <td>{idx + 1}</td>
                                        <td>{template.fileName}</td>
                                        <td>{template.fileType}</td>
                                        <td>{fileFormat}</td>
                                        <td>
                                            <Button
                                                onClick={() => { setLgShow(true); getTemplatesHeaders(tempName) }}
                                                variant="light"
                                                style={{ backgroundColor: '#12B5B0', color: 'white' }}
                                            >
                                                View Format
                                            </Button>
                                            <Modal
                                                size="lg"
                                                show={lgShow}
                                                onHide={() => setLgShow(false)}
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered

                                            >
                                                <Modal.Header style={{ color: '#12B5B0', fontSize: 25 }} closeButton>
                                                    Template Headers
                                                </Modal.Header>
                                                <Modal.Body style={{ overflowY: "scroll", maxHeight: "calc(100vh - 159px)" }}>
                                                    <Table>
                                                        <thead style={{ border: '1px solid black', borderRadius: '10px' }}>
                                                            <tr>
                                                                <th style={{ color: '#12B5B0' }}>S.No</th>
                                                                <th style={{ color: '#12B5B0' }}>Header Values</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {templateHeaders.map((header, idx) => {
                                                                return (
                                                                    <>
                                                                        <tr style={{ margin: '20px' }}>
                                                                            <td>Header {idx + 1} : </td>
                                                                            <td>{header}</td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </Table>
                                                </Modal.Body>
                                            </Modal>
                                        </td>
                                    </tr>
                                </>
                            )

                        })}

                    </tbody>
                </Table> : <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}><b>No templates yet! Create one by <Link to="/template" style={{ color: "#12B5B0" }}>clicking here.</Link></b></p>}

            </div>
        </>
    )
}
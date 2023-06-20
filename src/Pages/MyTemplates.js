import React, { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Templetepopup from "../Components/Templetepopup";
import { Modal } from "react-bootstrap";






const dummydata = [
    {
        input: "hdfc",
        output: "lic"
    },
    {
        input: "canara",
        output: "sree"
    },
    {
        input: "sbi",
        output: "sri"
    },
]


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
        const result = await axios.get("http://localhost:1827/header/mapping/" + key)
        try {
            setMappings(result.data.mappingData)
            setMappedHeaders(result.data.mappedHeaders)
            // console.log("Records Retrieved")
        } catch (err) {
            console.log("Error with this call")
        }
    }


    return (
        <>
            <div style={{ textAlign: 'right', margin: '30px', }}>
                <button style={{ backgroundColor: '#12B5B0', width: '200px', height: '40px', borderRadius: '20px', color: "white", border: "none" }} onClick={onHandleClick}>Create New Template</button>
            </div>
            <h1 style={{ margin:'50px' }}>My Templates</h1>
            <div className="container">
                <Table>
                    <thead style={{ border: '2px solid black' }}>
                        <tr>
                            <th>Input Format Type</th>
                            <th>Output Format Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {mappings.map((mapping) => {
                            return (
                                <>
                                    <tr style={{ margin: '20px' }}>
                                        <td>{mapping.ipFile}</td>
                                        <td>{mapping.opFile}</td>
                                        <td>
                                            <Button
                                                onClick={() => setLgShow(true)}
                                                variant="light"
                                                style={{ backgroundColor: 'grey', color: 'black' }}
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
                                                        <div><h4>Input Field</h4>
                                                            {Object.entries(mappedHeaders).map(
                                                                (arr) => {
                                                                    return <p>{arr[0]}</p>
                                                                }
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4>Output Field</h4>
                                                            {Object.entries(mappedHeaders).map(
                                                                (arr) => {
                                                                    return arr[1].map((header) => {
                                                                        if (arr[1].length !== 1) {
                                                                            return <div style={{ display: "flex" }}><p>{header},</p></div>
                                                                        }
                                                                        else return <p>{header}</p>
                                                                    })
                                                                }
                                                            )}
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
                </Table>
            </div>
        </>
    )
}
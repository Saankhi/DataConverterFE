import React, { useState } from "react"
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

    const navigate = useNavigate();

    const onHandleClick = () => {
        navigate("/template")
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

                        {dummydata.map((data) => {
                            return (
                                <>
                                    <tr>
                                        <td>{data.input}</td>
                                        <td>{data.output}</td>
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
                                                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                                                        <div><h4>Inputfield</h4>
                                                            <p>SurName</p>
                                                            <p>FirstName</p>
                                                            <p>Gender</p>
                                                            <p>AccountNo</p>
                                                            <p>Branch</p>
                                                            <p>currency</p>
                                                            <p>AccountType</p>
                                                            <p>AccountBalance</p>
                                                            <p>IFSC Code</p>
                                                        </div>
                                                        <div>
                                                            <h4>Output Field</h4>
                                                            <p>SurName</p>
                                                            <p>FirstName</p>
                                                            <p>Gender</p>
                                                            <p>AccountNo</p>
                                                            <p>Branch</p>
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
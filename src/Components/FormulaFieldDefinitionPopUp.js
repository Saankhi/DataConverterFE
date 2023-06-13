import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"



export default function FormulaFieldDefinitionPopUp(props) {

    const [select1, setSelect1] = useState()
    const [select2, setSelect2] = useState()
    const [select3, setSelect3] = useState()

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal"
        >

            <Modal.Body>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <h6></h6>
                    <Form.Select value={select1} onChange={(e) => setSelect1(e.target.value)}>
                        <option>Select</option>
                        {props.ipHeaders.map((file) => {
                            return (
                                <option value={file.headerValues}>{file.headerValues}</option>
                            )
                        })}
                    </Form.Select>
                    <Form.Select value={select2} onChange={(e) => setSelect2(e.target.value)}>
                        <option>Select</option>
                        {props.ipHeaders.map((file) => {
                            return (
                                <option value={file.headerValues}>{file.headerValues}</option>
                            )
                        })}
                    </Form.Select>
                    <Form.Select value={select3} onChange={(e) => setSelect3(e.target.value)} >
                        <option>Select</option>
                        {props.ipHeaders.map((file) => {
                            return (
                                <option value={file.headerValues}>{file.headerValues}</option>
                            )
                        })}
                    </Form.Select>
                    <Button style={{ margin: "auto" }}>Save</Button>
                </div>

            </Modal.Body>

        </Modal>
    )
}
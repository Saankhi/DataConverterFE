import React from "react"
import { Modal , Button } from "react-bootstrap";

export default function PopUp(props) {
    return (
        <>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h5>Your file has been successfully converted.Please download it.</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
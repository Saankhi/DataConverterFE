import React, { useState } from "react"
import axios from "axios"
import { Form, FormLabel, FormControl, Button, Table, InputGroup } from "react-bootstrap"
import * as MdIcons from "react-icons/md"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function OPFileDefinition() {


    const [outputFileName, setOutputFileName] = useState(null)
    const [outputFileFormat, setOutputFileFormat] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const [headersCount, setHeadersCount] = useState(null)
    const [headerTable, setHeaderTable] = useState(false)
    const [headersObj, setHeadersObj] = useState({})
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userDept = userInfo[0].department

    const addHeader = () => {
        setIsClicked(true)
    }

    const addTable = () => {
        setHeaderTable(true)
        var obj = {}
        for (let i = 1; i <= headersCount; i++) {
            obj[i] = { "headerValue": "" }
        }
        setHeadersObj(obj)
    }

    const handleChange = (key, e) => {
        setHeadersObj({ ...headersObj, [key]: { "headerValue": e.target.value } })
    }


    const outputTrimmedValue = () => {
        if (outputFileName.endsWith(' ')) {
            return outputFileName.trim();
        } else {
            return outputFileName;
        }
    }

    const onAdd = async () => {

        const body = {
            fileName: outputTrimmedValue(),
            fileType: "Output",
            fileFormat: outputFileFormat,
            headersArray: Object.values(headersObj),
            department: userDept
        }


        const isNull = body.headersArray.every(obj => obj.headerValue !== "")

        if (isNull) {

            if (outputFileFormat === "text/xml") {

                var regex = /[!@#$%^&*(),.?":{}|<>]/;

                const isPresent = body.headersArray.find(obj => regex.test(obj.headerValue))

                if (isPresent) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'XML tags cannot contain special characters!Please check once.'
                    })
                } else {
                    try {
                        await axios.post("http://localhost:1827/header/addheader", body)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Template created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        navigate('/mapping')
                    } catch (err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Failed adding data'
                        })

                    }
                }

            } else {
                try {
                    await axios.post("http://localhost:1827/header/addheader", body)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Template created successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    navigate('/mapping')
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed adding data'
                    })

                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Header value should not be empty! Please check it'
            })
        }
    }

    const deleteHeader = (i) => {
        setHeadersCount(headersCount - 1)
        delete headersObj[i]
    }

    const handleHeadersCount = (e) => {
        setHeadersCount(e.target.value)
        setHeaderTable(false)
    }

    const onDelete = (i) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                deleteHeader(i);
            }
        })

    }


    return (
        <>

            <div className="input-group" style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "3rem", alignItems: "center" }}>
                <h4>Output Template Definition</h4><br />

                <div className="file-input" style={{ display: "flex", justifyContent: "space-evenly" }}>

                    <Form.Group style={{ display: "flex", padding: "1rem", alignItems: "center" }}>
                        <FormLabel style={{ width: "7rem" }}>Template Name</FormLabel>
                        <FormControl type="text" value={outputFileName} onChange={(e) => setOutputFileName(e.target.value)} placeholder="Name of the output file format" />
                    </Form.Group>

                    <Form.Group style={{ display: "flex", padding: "1rem", alignItems: "center", width: "15rem" }}>
                        <FormLabel style={{ width: "8rem" }}>Template Type</FormLabel>
                        <Form.Select value={outputFileFormat} onChange={(e) => setOutputFileFormat(e.target.value)}>
                            <option>Select type</option>
                            {/* <option value=".json">JSON</option>
                            <option value="text/xml">XML</option> */}
                            <option value=".csv">CSV</option>
                            <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">XLSX</option>
                        </Form.Select>
                    </Form.Group>

                </div><br />


                {outputFileName && outputFileFormat ?
                    <><Button onClick={addHeader} style={{ marginTop: "1rem", marginRight: "30rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>+Add Header</Button><br /></> :
                    <Button disabled style={{ marginTop: "1rem", marginRight: "30rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>+Add Header</Button>}

                {isClicked ? (<div style={{ display: "flex" }}>
                    <p style={{ paddingRight: "1rem", paddingTop: "0.5rem" }}>Enter your desired number of headers </p>
                    <FormControl type="text" value={headersCount} onChange={(e) => handleHeadersCount(e)} placeholder="Enter Value" style={{ width: "7rem" }} />
                    {headersCount ? <Button onClick={addTable} style={{ marginLeft: "1rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>Add</Button>
                        : <Button disabled style={{ marginLeft: "1rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>Add</Button>}
                </div>) : null}


                {headerTable ? (<>
                    <br />
                    <div style={{ overflowY: "scroll", maxHeight: "20rem" }}>
                        <Table striped bordered hover style={{ width: "30rem" }}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Header Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {headerTable && headersCount ? ([...Array(parseInt(headersCount))].map((i, index) => {
                                    const header = headersObj[index + 1]
                                    return (
                                        <tr>
                                            <th>Header {index + 1}</th>
                                            <th><InputGroup><FormControl type="text" value={header["headerValue"]} onChange={(e) => handleChange(index + 1, e)} /><MdIcons.MdDelete onClick={() => onDelete(index + 1)} style={{ paddingLeft: "0.2rem", marginTop: "0.5rem", color: "red", fontSize: "1.3rem" }} /></InputGroup></th>
                                        </tr>
                                    )
                                })) : null}
                            </tbody>

                        </Table></div><br />

                    <Button onClick={onAdd} style={{ margin: "0rem 2rem 1rem 50rem", width: "8rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>Save</Button>
                </>) : null}

            </div>
        </>
    )
}
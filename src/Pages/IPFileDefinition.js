import React, { useState } from "react"
import axios from "axios"
import Header from "../Components/Header"
import { Form, FormLabel, FormControl, Button, Table, InputGroup } from "react-bootstrap"
import * as MdIcons from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function IPFileDefinition() {


    const [inputFileName, setInputFileName] = useState(null)
    const [inputFileType, setInputFileType] = useState(null)
    const [inputFileFormat, setInputFileFormat] = useState(null)
    const [description, setDescription] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const [headersCount, setHeadersCount] = useState(null)
    const [headerTable, setHeaderTable] = useState(false)
    const [headersObj, setHeadersObj] = useState({})
    const navigate = useNavigate()

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



    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            //autofocus.
        }
    }

    const handleChange = (key, e) => {
        setHeadersObj({ ...headersObj, [key]: { "headerValue": e.target.value } })
    }




    const onAdd = async () => {
        const body = {
            fileName: inputFileName,
            fileType: inputFileType,
            fileFormat: inputFileFormat,
            headersArray: Object.values(headersObj),
            department: userDept
        }
        console.log(body)
        const headers = await axios.post("http://localhost:1827/header/addheader", body)
        alert('Data added successfull')
        try {
            console.log(headers.data.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="input-group" style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "3rem", alignItems: "center" }}>
                <h4>Input File Definition</h4><br />

                <div className="file-input" style={{ display: "flex", justifyContent: "space-evenly" }}>

                    <Form.Group style={{ display: "flex", padding: "1rem", alignItems: "center" }}>
                        <FormLabel style={{ width: "7rem" }}>File Name</FormLabel>
                        <FormControl type="text" value={inputFileName} onChange={(e) => setInputFileName(e.target.value)} placeholder="Name of the input file format" />
                    </Form.Group>

                    <Form.Group style={{ display: "flex", padding: "1rem", alignItems: "center", width: "18rem" }}>
                        <FormLabel style={{ width: "13rem" }}>File Format</FormLabel>
                        <Form.Select value={inputFileFormat} onChange={(e) => setInputFileFormat(e.target.value)}>
                            <option>Select type</option>
                            <option value="text/xml">XML</option>
                            <option value=".csv">CSV</option>
                            <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">XLSX</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group style={{ display: "flex", padding: "1rem", alignItems: "center", width: "16rem" }}>
                        <FormLabel style={{ width: "12rem" }}>File Type</FormLabel>
                        <Form.Select value={inputFileType} onChange={(e) => setInputFileType(e.target.value)}>
                            <option>Select type</option>
                            <option value="Input">Input</option>
                        </Form.Select>
                    </Form.Group>


                </div><br />

                <Form.Group style={{ display: "flex", width: "30rem" }}>
                    <FormLabel style={{ padding: "0.5rem" }}>Description</FormLabel>
                    <FormControl type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe about input file..." />

                </Form.Group><br />

                {inputFileName && inputFileType && description ?
                    <><Button onClick={addHeader} style={{ marginTop: "1rem", marginRight: "30rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>+Add Header</Button><br /></> :
                    <Button disabled style={{ marginTop: "1rem", marginRight: "30rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>+Add Header</Button>}

                {isClicked ? (<div style={{ display: "flex" }}>
                    <p style={{ paddingRight: "1rem", paddingTop: "0.5rem" }}>Enter your desired number of headers </p>
                    <FormControl type="text" value={headersCount} onChange={(e) => setHeadersCount(e.target.value)} placeholder="Enter Value" style={{ width: "7rem" }} />
                    {headersCount ? <Button onClick={addTable} style={{ marginLeft: "1rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>Add</Button>
                        : <Button disabled style={{ marginLeft: "1rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>Add</Button>}
                </div>) : null}


                {headerTable ? (<>
                    <br />
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
                                        <th><InputGroup><FormControl type="text" value={header["headerValue"]} onChange={(e) => handleChange(index + 1, e)} /><MdIcons.MdDelete style={{ paddingLeft: "0.2rem", marginTop: "0.5rem", color: "red" }} /></InputGroup></th>
                                    </tr>
                                )
                            })) : null}
                        </tbody>

                    </Table><br />

                    <Button onClick={onAdd} style={{ margin: "0rem 2rem 1rem 50rem", width: "8rem", backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem" }}>Save</Button>
                </>) : null}

            </div>
        </>
    )
}
import React, { useState } from "react"
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
import * as js2xmlparser from "js2xmlparser";
import PopUp from "../Components/PopUp";
import HeaderUser from "../Components/HeaderUser";
import axios from "axios"



export default function UserHome() {

    const [inputFile, setInputFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [inputFileType, setInputFileType] = useState(null)
    const [parsedData, setParsedData] = useState()               // i/p data to JSON parsing
    const [outputFileType, setOutputFileType] = useState(null)
    const [outputFileName, setOutputFileName] = useState(null)
    const [open, setOpen] = useState(false)

    const [inputFileHeaders, setInputFileHeaders] = useState([])
    const [outputFileHeaders, setOutputFileHeaders] = useState([])




    const handleFile = async (e) => {

        const file = e.target.files[0];
        setFileName(file.name)

        // const len = file.name.length
        // if (inputFileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        //     const output = file.name.substr(0, (len - 3))
        //     setOutputFileName(output)
        // } else {
        //     const output = file.name.substr(0, (len - 4))
        //     setOutputFileName(output)
        // }


        if (inputFileType === "text/xml") {
            const reader = new FileReader();
            reader.onload = () => {
                const xmlString = reader.result
                setInputFile(xmlString)
            }
            reader.readAsBinaryString(file)
        }
        else {
            setInputFile(file)
        }
    }


    const handelInputFileFormat = async (e) => {

        const key = e.target.value
        console.log(key)
        const result = await axios.get("https://extinct-crow-tie.cyclic.app/header/allheaders/" + key)
        try {
            setInputFileType(result.data.files.type)
            setInputFileHeaders(result.data.files.headers)
        } catch (err) {
            console.log("Error")
        }
    }


    const handelOutputFileFormat = async (e) => {

        const key = e.target.value
        const result = await axios.get("https://extinct-crow-tie.cyclic.app/header/allheaders/" + key)
        try {
            setOutputFileName(result.data.files.name)
            setOutputFileType(result.data.files.type)
            setOutputFileHeaders(result.data.files.headers)
        } catch (err) {
            console.log("Error")
        }
    }

    // console.log(inputFileType)
    // console.log(outputFileType)

    // Conerting input file data to JSON ::::  filtering in this segment ::::

    async function convertData() {
        if (inputFileType !== "text/xml") {

            const data = await inputFile.arrayBuffer();
            const workbook = XLSX.read(data);

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet)

            const inputHeaders = Object.keys(jsonData[0])

            const unselectedHeaders = inputHeaders.filter((ipHeader) => {
                var isPresent = false
                outputFileHeaders.forEach((opHeader) => {
                    if (ipHeader === opHeader) {
                        isPresent = true
                    }
                })
                return !isPresent
            })

            console.log(unselectedHeaders)

            jsonData.forEach((obj) => {
                unselectedHeaders.forEach((header) => {
                    delete (obj[header])
                })
            })

            console.log(jsonData)
            setParsedData(jsonData)

        }

        else {

            var XMLParser = require('react-xml-parser')
            var xml = new XMLParser().parseFromString(inputFile);
            const childrenArr = xml.children;

            var arr = []

            childrenArr.forEach((obj) => {
                const subChildren = obj.children
                var recordObj = {}
                subChildren.forEach((headerObj) => {
                    recordObj[headerObj.name] = headerObj.value
                })
                arr.push(recordObj)
            });

            setParsedData(arr)
        }

    }

    // Converting JSON data to Ouput file type(extract) ::::

    async function extractParsedData() {

        if (outputFileType !== "xml" && outputFileType !== ".json") {

            const jsonSheet = XLSX.utils.json_to_sheet(parsedData)
            var newWb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWb, jsonSheet, "TVChars")
            return XLSX.writeFile(newWb, outputFileName + outputFileType)
        }

        // JSON to XML -- Needs to be extracted ::::
        else {

            if (outputFileType !== ".json") {
                const xmlData = js2xmlparser.parse("data", parsedData)

                const blob = new Blob([xmlData], { type: "text/xml" });
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.download = outputFileName + ".xml";
                link.href = url;
                link.click();
            } else {
                const jsonData = JSON.stringify(parsedData)

                const blob = new Blob([jsonData], { type: "application/json" });
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.download = outputFileName + ".json";
                link.href = url;
                link.click();

            }

        }
    }


    return (
        <>
            {/* <HeaderUser /> */}
            <div className="body" style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>

                <div className="input-group" style={{ display: "flex", flexDirection: "column" }}>
                    <h3 className="text-center">Select your input</h3><br />

                    <div className="input-group-selector" style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Form.Select onChange={(e) => handelInputFileFormat(e)} style={{ width: "11rem" }}>
                            <option>Input File Format</option>
                            <option value="HDFC Bank Input">HDFC Bank Input</option>
                            <option value="Axis Bank Input">Axis Bank Input</option>

                        </Form.Select>

                        <input type="file" accept={inputFileType} onChange={(e) => handleFile(e)} />

                        <Form.Select onChange={(e) => handelOutputFileFormat(e)} style={{ width: "11.5rem" }}>
                            <option>Output File Format</option>
                            <option value="LIC Insurance">LIC Insurance</option>
                            <option value="Tata AIG">TATA AIG</option>

                        </Form.Select>
                    </div>
                </div>

                <br /> <br />


                {/* {parsedData ? (<>
                    <Container>
                        <Row>
                            <h6>Your Output File Header Checklist :</h6>
                            {inputHeaders.map((header) => {
                                return (
                                    <Col>
                                        <Form.Check
                                            inline
                                            label={header}
                                            value={header}
                                            name="group1"
                                            type="checkbox"
                                            id={header}
                                            onChange={handelChange}
                                        />
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                </>) : null} */}



                <br /><br />

                <div style={{ display: "flex", justifyContent: "space-around" }}>

                    {/* <h4 className="p-2">Your desired output file format</h4> */}
                    {/* <Form.Select onChange={(e) => setOutputFileType(e.target.value)} style={{ width: "11rem" }}>
                        <option>Output File Type</option>
                        <option value="csv">CSV</option>
                        <option value="xml">XML</option>
                        <option value="xlsx">XLSX</option>
                    </Form.Select> */}
                </div><br />

                {/* {parsedData ?
                    <p>
                        Your desired {mapping} mapping will have the following headers in your output file :
                        <Container>
                            <Row>
                                {finalHeaders.map((header) => {
                                    return (
                                        <Col><b>{header}</b></Col>
                                    )
                                })}
                            </Row>
                        </Container> <br />
                        Your file has been converted to {outputFileType} file. Please download it.
                    </p> : null} */}

                {parsedData ?
                    <Button variant="outline-success" onClick={extractParsedData}>Download File</Button> :
                    (inputFileType && inputFile && outputFileType ?
                        <Button variant="success" onClick={() => { convertData(); setOpen(true) }}>Convert File</Button>
                        : <Button variant="success" disabled>Convert File</Button>)}
            </div>
            <PopUp
                show={open}
                onHide={() => { setOpen(false) }} />
        </>
    )
}
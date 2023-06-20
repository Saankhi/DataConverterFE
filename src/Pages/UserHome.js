import React, { useState, useEffect } from "react"
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
    const [fileNamesData, setFileNamesData] = useState([])
    const [ipFile, setIPFile] = useState()
    const [opFile, setOPFile] = useState()
    const [mappedHeaders, setMappedHeaders] = useState({})
    const [ipJSONData, setIPJSONData] = useState([])




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

    useEffect(() => {
        getFileNames();
    }, [])


    const getMappedHeaders = async () => {
        const body = {
            ipFileName: ipFile,
            opFileName: outputFileName
        }
        const result = await axios.post("http://localhost:1827/header/usermapping", body)
        try {
            setMappedHeaders(result.data.mappedHeaders)
            console.log(result.data.mappedHeaders)
        } catch (err) {
            console.log("Error retreving data")
            console.log(err)
        }
    }

    const handelInputFileFormat = async (e) => {

        const key = e.target.value
        const result = await axios.get("http://localhost:1827/header/allheaders/" + key)
        try {
            setIPFile(key)
            setInputFileType(result.data.headersDetails[0].fileFormat)
            setInputFileHeaders(result.data.headersDetails)
        } catch (err) {
            console.log("Error")
        }
    }

    // console.log(inputFileHeaders)

    const handelOutputFileFormat = async (e) => {

        const key = e.target.value
        const result = await axios.get("http://localhost:1827/header/allheaders/" + key)
        try {
            setOPFile(key)
            setOutputFileName(result.data.headersDetails[0].fileName)
            setOutputFileType(result.data.headersDetails[0].fileFormat)
            setOutputFileHeaders(result.data.headersDetails)

        } catch (err) {
            console.log("Error")
        }
    }

    // console.log(outputFileHeaders)

    const getFileNames = async () => {
        const data = await axios.get("http://localhost:1827/header/allfiles")
        try {
            setFileNamesData(data.data.fileTypeDetails)
            // console.log(data.data.fileTypeDetails)
        } catch (err) {
            console.log("Error retreving data")
        }
    }





    // Conerting input file data to JSON ::::  filtering in this segment ::::

    console.log(mappedHeaders)
    const headerArrays = Object.values(mappedHeaders)

    async function convertData() {

        getMappedHeaders();
        if (inputFileType !== "text/xml") {

            const data = await inputFile.arrayBuffer();
            const workbook = XLSX.read(data);

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet)



            console.log("ipData:", jsonData)
            setIPJSONData(jsonData)


            // const unselectedHeaders = inputHeaders.filter((ipHeader) => {
            //     var isPresent = false
            //     outputFileHeaders.forEach((opHeader) => {
            //         if (ipHeader === opHeader) {
            //             isPresent = true
            //         }
            //     })
            //     return !isPresent
            // })

            // console.log(unselectedHeaders)

            // jsonData.forEach((obj) => {
            //     unselectedHeaders.forEach((header) => {
            //         delete (obj[header])
            //     })
            // })
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


    const inputHeaders = Object.keys(ipJSONData[0])
    console.log(inputHeaders)

    // Data conersion to opData 

    console.log(headerArrays)

    function OPJSONData() {

        ipJSONData.forEach((obj) => {
            headerArrays.map((arr) => {
                if (arr.length !== 1) {
                    const newHeader = Object.keys(mappedHeaders).find(key => mappedHeaders[key] === arr)
                    for (let i = 0; i < arr.length; i++) {
                        if (i === 0) {
                            obj[newHeader] = obj[arr[i]] + " "
                        } else {
                            obj[newHeader] += obj[arr[i]] + " "

                        }
                        delete obj[arr[i]]
                    }

                } else {
                    const header = arr[0]
                    const newHeader = Object.keys(mappedHeaders).find(key =>
                        mappedHeaders[key] === arr)
                    obj[newHeader] = obj[header]
                    delete obj[header]
                }

            })

        })

        console.log("opData: ", ipJSONData)
        setParsedData(ipJSONData)
    }

    // Converting JSON data to Ouput file type(extract) ::::

    async function extractParsedData() {

        if (outputFileType !== "xml" && outputFileType !== ".json") {

            const jsonSheet = XLSX.utils.json_to_sheet(parsedData)
            var newWb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWb, jsonSheet, "Sheet1")
            return XLSX.writeFile(newWb, outputFileName + ".xlsx")
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
                        <Form.Select value={ipFile} onChange={(e) => handelInputFileFormat(e)} style={{ width: "11rem" }}>
                            <option>Input File Format</option>
                            {fileNamesData.length > 0 ? (<>
                                {fileNamesData.map((file) => {
                                    if (file.fileType === "Input")
                                        return <option>{file.fileName}</option>
                                })}
                            </>) : null}


                        </Form.Select>

                        <input type="file" accept={inputFileType} onChange={(e) => handleFile(e)} />

                        <Form.Select value={opFile} onChange={(e) => handelOutputFileFormat(e)} style={{ width: "11.5rem" }}>
                            <option>Output File Format</option>
                            {fileNamesData.length > 0 ? (<>
                                {fileNamesData.map((file) => {
                                    if (file.fileType === "Output")
                                        return <option>{file.fileName}</option>
                                })}
                            </>) : null}

                        </Form.Select>
                    </div>
                </div>

                <br /> <br />



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
                    (ipFile && inputFile && opFile ?
                        <Button variant="success" onClick={() => { convertData(); setOpen(true) }}>Convert File</Button>
                        : <Button variant="success" disabled>Convert File</Button>)}
            </div>
            <PopUp
                show={open}
                onHide={() => { setOpen(false) }}
                opData={OPJSONData} />
        </>
    )
}
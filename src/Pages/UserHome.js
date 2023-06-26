import React, { useState, useEffect } from "react"
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
import * as js2xmlparser from "js2xmlparser";
import PopUp from "../Components/PopUp";
import HeaderUser from "../Components/HeaderUser";
import axios from "axios"
import Swal from "sweetalert2";



export default function UserHome() {

    const [inputFile, setInputFile] = useState(null)
    const [inputFileType, setInputFileType] = useState(null)
    const [parsedData, setParsedData] = useState()               // i/p data to JSON parsing
    const [outputFileType, setOutputFileType] = useState(null)
    const [outputFileName, setOutputFileName] = useState(null)
    const [open, setOpen] = useState(false)
    const [enableOp, setEnableOp] = useState(false)
    const [enableFile, setEnableFile] = useState(false)
    const [ipFile, setIPFile] = useState()
    const [opFile, setOPFile] = useState()
    const [mappedHeaders, setMappedHeaders] = useState({})
    const [ipJSONData, setIPJSONData] = useState([])
    const [opFiles, setOPFiles] = useState([])
    const [ipFileNames, setIPFileNames] = useState([])
    const [ipHeaders, setIPHeaders] = useState([])



    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userDept = userInfo[0].department


    function arraysAreEqual(array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }


        return true;
    }


    const handleFile = async (e) => {

        const file = e.target.files[0];

        getOPFiles();


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
        } catch (err) {
            console.log("Error retreving data")
            console.log(err)
        }
    }

    const getOPFiles = async () => {

        const body = {
            ipFilekey: ipFile,
            departmentkey: userDept
        }
        const result = await axios.post("http://localhost:1827/header/getmapping", body)
        try {
            setOPFiles(result.data.mappingData)
        } catch (err) {
            console.log("Error")
        }
    }

    const handelInputFileFormat = async (e) => {

        const key = e.target.value
        const result = await axios.get("http://localhost:1827/header/allheaders/" + key)
        try {
            setIPFile(key)
            setInputFileType(result.data.headersDetails[0].fileFormat)
            setEnableFile(true)
            setEnableOp(true)
        } catch (err) {
            console.log("Error")
        }
    }


    const handelOutputFileFormat = async (e) => {

        const key = e.target.value
        const result = await axios.get("http://localhost:1827/header/allheaders/" + key)
        try {
            setOPFile(key)
            setOutputFileName(result.data.headersDetails[0].fileName)
            setOutputFileType(result.data.headersDetails[0].fileFormat)

        } catch (err) {
            console.log("Error")
        }
    }


    const getFileNames = async () => {
        const data = await axios.get("http://localhost:1827/header/mapping/" + userDept)
        try {
            const uniqueArray = data.data.mappingData.filter((obj, index, self) =>
                index === self.findIndex((o) => o.ipFile === obj.ipFile)
            );
            setIPFileNames(uniqueArray)
        } catch (err) {
            console.log("Error")
        }
    }


    // Conerting input file data to JSON ::::  filtering in this segment ::::



    async function convertData() {

        getMappedHeaders();
        if (inputFileType !== "text/xml") {

            const data = await inputFile.arrayBuffer();
            const workbook = XLSX.read(data);

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet)

            console.log("IP JSON Data:", jsonData)
            setIPJSONData(jsonData)
            setIPHeaders(Object.keys(jsonData[0]))
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

            console.log("IP JSON Data:", arr)
            setIPJSONData(arr)
        }

    }

    // Data conersion to opData 

    function OPJSONData() {


        function transformInput(ipJSONData, ipHeaders, mappedHeaders) {
            const output = [];

            for (let i = 0; i < ipJSONData.length; i++) {
                const transformedObj = {};

                for (const key in mappedHeaders) {
                    const mappedKeys = mappedHeaders[key];

                    for (let j = 0; j < mappedKeys.length; j++) {
                        const mappedKey = mappedKeys[j];

                        if (ipHeaders.includes(mappedKey)) {
                            if (!transformedObj[key]) {
                                transformedObj[key] = "";
                            }

                            transformedObj[key] += ipJSONData[i][mappedKey] + " ";
                        }
                    }
                }

                output.push(transformedObj);
            }

            return output;
        }

        const output = transformInput(ipJSONData, ipHeaders, mappedHeaders);

        setParsedData(output)
    }




    // Converting JSON data to Ouput file type(extract) ::::

    async function extractParsedData() {

        console.log(outputFileType)

        if (outputFileType !== "text/xml" && outputFileType !== ".json") {

            console.log("OP Json Data: ", parsedData)
            const jsonSheet = XLSX.utils.json_to_sheet(parsedData)
            var newWb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWb, jsonSheet, "Sheet1")
            return (
                XLSX.writeFile(newWb, outputFileName + ".xlsx"),
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your file has been downloaded',
                    showConfirmButton: false,
                    timer: 1500
                }),
                window.location.reload()

            )
        }

        // JSON to XML -- Needs to be extracted ::::
        else {

            if (outputFileType !== ".json") {
                console.log("OP Json Data: ", parsedData)
                const xmlData = js2xmlparser.parse("data", parsedData)

                const blob = new Blob([xmlData], { type: "text/xml" });
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.download = outputFileName + ".xml";
                link.href = url;
                link.click();
            } else {

                console.log("OP Json Data: ", parsedData)
                const jsonData = JSON.stringify(parsedData)

                console.log("JSON Data:", jsonData)

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
            <div className="body" style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>

                <div className="input-group" style={{ display: "flex", flexDirection: "column" }}>
                    <h3 className="text-center">Select your input</h3><br />

                    <div className="input-group-selector" style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Form.Select value={ipFile} onChange={(e) => handelInputFileFormat(e)} style={{ width: "11rem" }}>
                            <option>Input File Format</option>
                            {ipFileNames.length > 0 ? (<>
                                {ipFileNames.map((obj) => {
                                    return <option>{obj.ipFile}</option>
                                })}
                            </>) : null}


                        </Form.Select>

                        {enableFile ? <input type="file" accept={inputFileType} onChange={(e) => handleFile(e)} /> : <input disabled type="file" accept={inputFileType} onChange={(e) => handleFile(e)} />}

                        {enableOp && inputFile ? (
                            <Form.Select value={opFile} onChange={(e) => handelOutputFileFormat(e)} style={{ width: "11.5rem" }}>
                                <option>Output File Format</option>
                                {opFiles.length > 0 ? (<>
                                    {opFiles.map((obj) => {
                                        return <option>{obj.opFile}</option>
                                    })}
                                </>) : null}
                            </Form.Select>
                        ) : (<Form.Select disabled style={{ width: "11.5rem" }}>
                            <option>Output File Format</option>
                        </Form.Select>)
                        }
                    </div>
                </div>

                <br /> <br />
                <br /><br />

                <div style={{ display: "flex", justifyContent: "space-around" }}>

                </div><br />

                {parsedData ?
                    <Button variant="outline-success" onClick={() => { setTimeout(() => { extractParsedData() }, 2000) }}>Download File</Button> :
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
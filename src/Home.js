import React, { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import * as js2xmlparser from "js2xmlparser";



export default function Home() {

    const [inputFile, setInputFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [inputFileType, setInputFileType] = useState(null)
    const [parsedData, setParsedData] = useState()               // i/p data to JSON parsing
    const [outputFileType, setOutputFileType] = useState(null)
    const [outputFileName, setOutputFileName] = useState(null)
    const [encoding, setEncoding] = useState(null)



    const handleFile = async (e) => {

        const file = e.target.files[0];
        setFileName(file.name)

        const len = file.name.length
        if (inputFileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            const output = file.name.substr(0, (len - 3))
            setOutputFileName(output)
        } else {
            const output = file.name.substr(0, (len - 4))
            setOutputFileName(output)
        }

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


    // Conerting input file data to JSON ::::

    async function convertData() {
        if (inputFileType !== "text/xml") {

            const data = await inputFile.arrayBuffer();
            const workbook = XLSX.read(data);

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet)
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

        if (outputFileType !== "xml") {

            const jsonSheet = XLSX.utils.json_to_sheet(parsedData)
            var newWb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWb, jsonSheet, "TVChars")
            console.log(outputFileName)
            return XLSX.writeFile(newWb, outputFileName + outputFileType)
        }

        // JSON to XML -- Needs to be extracted ::::
        else {
            const xmlData = js2xmlparser.parse("data", parsedData)

            const blob = new Blob([xmlData], { type: "text/xml" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.download = outputFileName + "xml";
            link.href = url;
            link.click();

        }
    }

    return (
        <>
            <div className="body" style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>

                <div className="input-group" style={{ display: "flex", flexDirection: "column" }}>
                    <h3 className="text-center">Select your input</h3><br />

                    <div className="input-group-selector" style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Form.Select onChange={(e) => setInputFileType(e.target.value)} style={{ width: "10rem" }}>
                            <option>Input File Type</option>
                            <option value=".csv">CSV</option>
                            <option value="text/xml">XML</option>
                            <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">XLSX</option>
                        </Form.Select>

                        <input type="file" accept={inputFileType} onChange={(e) => handleFile(e)} />

                        <Form.Select onChange={(e) => setEncoding(e.target.value)} style={{ width: "10rem" }}>
                            <option>Encoding</option>
                            <option value="utf-8">UTF-8</option>
                            <option value="utf-16">UTF-16</option>
                            <option value="utf-16(be)">UTF-16(Big-Endian)</option>
                        </Form.Select>
                    </div>
                </div>

                <br /><br />

                <div style={{ display: "flex", justifyContent: "space-around" }}>

                    <h4 className="p-2">Your desired output file type</h4>
                    <Form.Select onChange={(e) => setOutputFileType(e.target.value)} style={{ width: "11rem" }}>
                        <option>Output File Type</option>
                        <option value="csv">CSV</option>
                        <option value="xml">XML</option>
                        <option value="xlsx">XLSX</option>
                    </Form.Select>
                </div><br />

                {parsedData ? <p>Your fie has been converted to {outputFileType} file. Please download it</p> : null}
                {parsedData ?
                    <Button variant="outline-success" onClick={extractParsedData}>Download File</Button> :
                    (outputFileType ? <Button variant="success" onClick={convertData}>Convert File</Button>
                        : <Button variant="success" disabled>Convert File</Button>)}

            </div>
        </>
    )
}
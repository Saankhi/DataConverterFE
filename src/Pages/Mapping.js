import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function Mapping() {


    const [fileNamesData, setFileNamesData] = useState([])
    const [opFileHeadersData, setOPFileHeadersData] = useState([])
    const [ipFileHeadersData, setIPFileHeadersData] = useState([])
    const [opFile, setOPFile] = useState()
    const [ipFile, setIPFile] = useState()
    const [showOP, setShowOp] = useState(false)
    const [showIP, setShowIp] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [opSelect, setOPSelect] = useState({ idx: 0 })

    // const ipFileName = localStorage.getItem('ipFile')
    // const opFileName = localStorage.getItem('opFile')

    const handleChangeOP = (idx, e) => {
        setOPSelect({ [idx]: e.target.value })
    }



    useEffect(() => {
        getFileNames();
    }, [])

    const getFileNames = async () => {
        const data = await axios.get("http://localhost:1827/header/allfiles")
        try {
            setFileNamesData(data.data.fileTypeDetails)
            console.log(data.data.fileTypeDetails)
        } catch (err) {
            console.log("Error retreving data")
        }
    }


    const getHeaders = async (key) => {
        const data = await axios.get("http://localhost:1827/header/allheaders/" + key)
        const headersResult = data.data.headersDetails
        console.log(key, headersResult)
        var isOutput = false
        headersResult.filter((obj) => {
            if (obj.fileType === "Output") {
                return isOutput = true
            }
        })
        try {
            if (isOutput) {
                setOPFileHeadersData(data.data.headersDetails)
                console.log("OP file : ", data.data.headersDetails)
            }
            else {
                setIPFileHeadersData(data.data.headersDetails)
                console.log("IP file : ", data.data.headersDetails)
            }
        } catch (err) {
            console.log("Error retreving data")
        }
    }


    const onSave = () => {

    }

    return (
        <>
            {/* <Header /> */}
            <div style={{ display: 'flex', justifyContent: "space-evenly", marginLeft: '350px' }}><h1 >Field Mapping</h1>
                <a href="" style={{ marginTop: '20px' }}>Load Saved Mapping</a></div>
            <div style={{ justifyContent: 'space-between', display: 'flex', backgroundColor: 'black', color: '#fff', height: "3rem" }}>
                <div style={{ display: 'flex', marginLeft: '40px' }}>
                    {fileNamesData.length > 0 ? (<>
                        <Form.Select style={{ backgroundColor: "black", color: "white", border: "none", marginLeft: "8rem" }} value={opFile} onChange={(e) => (setOPFile(e.target.value), getHeaders(e.target.value), setShowOp(true))}>
                            <option>Output Format Type</option>
                            {fileNamesData.map((file) => {
                                if (file.fileType === "Output")
                                    return <option>{file.fileName}</option>

                            })}

                        </Form.Select>
                        {/* <span><h6 style={{textAlign:"center", marginTop:"1rem"}}>Output</h6></span> */}
                    </>) : (<Form.Select>
                        <option>Output Format Type</option>
                    </Form.Select>)}

                </div>

                <div style={{ display: 'flex', marginRight: '40px' }}>
                    {fileNamesData.length > 0 ? (
                        <Form.Select style={{ backgroundColor: "black", color: "white", border: "none", marginRight: "4rem" }} value={ipFile} onChange={(e) => (setIPFile(e.target.value), getHeaders(e.target.value), setShowIp(true))}>
                            <option>Input Format Type</option>
                            {fileNamesData.map((file) => {
                                if (file.fileType === "Input")
                                    return <option>{file.fileName}</option>
                            })}

                        </Form.Select>) : (<Form.Select value={opFile} onChange={(e) => setOPFile(e.target.value)}>
                            <option>Input Format Type</option>
                        </Form.Select>)}
                </div>
            </div>
            {opFileHeadersData.length > 0 || ipFileHeadersData.length > 0 ? (<>
                {showOP ? (<>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ backgroundColor: '#12B5B0', width: '30rem', height: "calc(100vh - 178px)" }} className="life">
                            {opFileHeadersData.map((idx) => {
                                return (
                                    <>
                                        <li style={{ marginTop: '10px', display: "flex", alignItems: "center" }}>
                                            <Form.Select value={opSelect.idx} onChange={(e) => handleChangeOP(idx, e)} style={{ width: "10rem", textAlign: "center", margin: "auto" }}>
                                                <option>Select</option>
                                                {opFileHeadersData.map((file) => {
                                                    return (
                                                        <option value={file.headerValues}>{file.headerValues}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </li><hr />
                                    </>
                                )
                            })}
                        </div>
                        {showIP ? (<div style={{ backgroundColor: '#A9ECFB', width: '30rem', height: "calc(100vh - 178px)" }} className="hdfc">

                            {ipFileHeadersData.map((file) => {
                                return (
                                    <><li style={{ marginTop: '10px' }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Form.Select>
                                                <option>Select</option>
                                                {ipFileHeadersData.map((file) => {
                                                    return (
                                                        <option value={file.headerValues}>{file.headerValues}</option>
                                                    )
                                                })}
                                            </Form.Select>

                                            <Button style={{ margin: "auto" }}>Save</Button>
                                        </div>
                                    </li><hr /></>
                                )
                            })}
                            {/* <button className="save">Save</button> */}
                            {/* <Button style={{ backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem", width: "7rem" }}>Save</Button> */}

                        </div>) : null}
                    </div>
                </>) : null}

            </>) : null}


        </>
    )
}
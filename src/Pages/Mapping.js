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
import Swal from "sweetalert2";



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
    const [selectedOptions, setSelectedOptions] = useState({})
    const [opSelect, setOPSelect] = useState({})
    const [operator, setOperator] = useState({})
    const navigate = useNavigate();


    const handleChangeOP = (idx, e) => {

        setOPSelect({ ...opSelect, [idx]: e.target.value })
    }


    const handleChange = (e, idx) => {
        setSelectedOptions({ ...selectedOptions, [idx]: e.target.value })
    }


    const handleChangeOperator = (e, idx) => {
        setOperator({ ...operator, [idx]: e.target.value })
    }


    useEffect(() => {
        getFileNames();
    }, [])


    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const key = userInfo[0].department

    const getFileNames = async () => {
        const data = await axios.get("http://localhost:1827/header/allfiles/" + key)
        try {
            setFileNamesData(data.data.fileTypeDetails)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!please try again after sometime.'
            })
        }
    }


    const getHeaders = async (key) => {
        const data = await axios.get("http://localhost:1827/header/allheaders/" + key)
        const headersResult = data.data.headersDetails
        var isOutput = false
        headersResult.filter((obj) => {
            if (obj.fileType === "Output") {
                return isOutput = true
            }
        })
        try {
            if (isOutput) {
                setOPFileHeadersData(data.data.headersDetails)
            }
            else {
                setIPFileHeadersData(data.data.headersDetails)
                data.data.headersDetails.map((item, idx) => {
                    setSelectedOptions((prevState) => { return { ...prevState, [idx]: [] } })
                })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!Please try again after sometime'
            })
        }
    }



    const onSave = async () => {
        const obj = {}

        for (const [key, value] of Object.entries(opSelect)) {
            obj[value] = [selectedOptions[key], operator[key]]
        }

        const body = {
            ipFile: ipFile,
            opFile: opFile,
            mappedHeaders: obj,
            department: key
        }

        try {
            const headers = await axios.post("http://localhost:1827/header/addmapping", body)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mapping has been saved successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/mymappings')

        } catch (err) {

            if (err.response && err.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            }

        }
    }



    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-evenly" }}><h1>Field Mapping</h1></div>
            <div style={{ justifyContent: 'space-between', display: 'flex', backgroundColor: 'black', color: '#fff', height: "3rem" }}>
                <div style={{ display: 'flex', marginLeft: '40px' }}>

                    {fileNamesData.length > 0 ? (<>
                        <Form.Select style={{ backgroundColor: "black", color: "white", border: "none", marginLeft: "8rem" }} value={opFile} onChange={(e) => (setOPFile(e.target.value), getHeaders(e.target.value), setShowOp(true))}>
                            <option>Output File</option>
                            {fileNamesData.map((file) => {
                                if (file.fileType === "Output")
                                    return <option>{file.fileName}</option>

                            })}

                        </Form.Select>
                        {opFile ? <span><h6 style={{ textAlign: "center", marginTop: "1rem" }}>(Output)</h6></span> : null}

                    </>) : (<Form.Select style={{ backgroundColor: "black", color: "white", border: "none", marginLeft: "8rem" }}>
                        <option>Output Format Type</option>
                    </Form.Select>)}

                </div>
                {showIP ? <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                    <h4>Operator</h4>

                </div> : null}


                <div style={{ display: 'flex', marginRight: '40px' }}>
                    {ipFile ? <span><h6 style={{ textAlign: "center", marginTop: "1rem" }}>(Input)</h6></span> : null}
                    {fileNamesData.length > 0 ? (
                        <Form.Select style={{ backgroundColor: "black", color: "white", border: "none", marginRight: "4rem" }} value={ipFile} onChange={(e) => (setIPFile(e.target.value), getHeaders(e.target.value), setShowIp(true))}>
                            <option>Input File</option>
                            {fileNamesData.map((file) => {
                                if (file.fileType === "Input")
                                    return <option>{file.fileName}</option>
                            })}

                        </Form.Select>) : (<Form.Select style={{ backgroundColor: "black", color: "white", border: "none", marginLeft: "8rem" }}>
                            <option>Input Format Type</option>
                        </Form.Select>)}
                </div>
            </div>
            {opFileHeadersData.length > 0 || ipFileHeadersData.length > 0 ? (<>
                {showOP ? (<>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ backgroundColor: '#12B5B0', width: '30rem', height: "calc(100vh - 178px)" }} className="life">
                            {opFileHeadersData.map((item, idx) => {
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
                        <div style={{ width: '30rem', height: "calc(100vh - 178px)" }}>

                            {showIP ? (<>
                                <div style={{ width: '30rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} className="life">
                                    {opFileHeadersData.map((item, idx) => {
                                        return (
                                            <>
                                                <li style={{ marginTop: '10px', display: "flex", alignItems: "center" }}>
                                                    <Form.Select value={operator.idx} onChange={(e) => handleChangeOperator(e, idx)} style={{ width: "10rem", textAlign: "center", margin: "auto" }}>
                                                        {/* <option>Select</option> */}
                                                        <option value="none">None</option>
                                                        <option value="+">Add (+)</option>
                                                        <option value="-">Substract (-)</option>
                                                        <option value="*">Multiply (*)</option>
                                                        <option value="%">Divide (/)</option>
                                                        <option value="--">Hyphen (-)</option>
                                                        <option value=",">Comma (,)</option>
                                                        <option value="_">Underscore (_)</option>
                                                        <option value="/">Forward Slash (/)</option>
                                                        <option value="&">And (&)</option>
                                                    </Form.Select>
                                                </li><hr />
                                            </>
                                        )
                                    })}
                                    <Button onClick={onSave} style={{ backgroundColor: "#12B5B0", border: "none", borderRadius: "1rem", width: "7rem", marginLeft: '150px' }} >Save</Button>
                                </div>

                            </>)
                                : null}
                        </div>
                        {showIP ? (<div style={{ backgroundColor: '#A9ECFB', width: '25rem', height: "calc(100vh - 178px)", overflowY: "scroll" }} className="hdfc">

                            {ipFileHeadersData.map((file, idx) => {
                                return (
                                    <><li style={{ marginTop: '10px' }}>
                                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                                            <FormControl sx={{ m: 1, ml: 12, width: 250 }}>
                                                <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
                                                <Select
                                                    multiple
                                                    value={selectedOptions[idx]}
                                                    onChange={(e) => handleChange(e, idx)}
                                                    input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                >
                                                    {ipFileHeadersData.map((name) => (
                                                        <MenuItem key={name.headerValues} value={name.headerValues}>
                                                            <Checkbox checked={selectedOptions[idx].includes(name.headerValues)} />
                                                            <ListItemText primary={name.headerValues} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </li><hr /></>
                                )
                            })}


                        </div>) : null}
                    </div>

                </>) : null}

            </>) : null}


        </>
    )
}
import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import * as MdIcons from "react-icons/md"
import Userspopup from "./Userspopup";
import Swal from "sweetalert2";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: '#12B5B0',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




export default function UserDetails() {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        getDetails()
    }, [modalShow]);

    const getDetails = () => {
        axios
            .get('http://localhost:1827/auth/allusers')
            .then(response => {
                setData(response.data.details);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const deletehandler = (mobile) => {
        axios.delete('http://localhost:1827/auth/delteuser/' + mobile)
            .then((response) => {
                const deletedata = data.filter((row) => row.mobile !== mobile);
                setData(deletedata);
                getDetails();
            })
    }

    const Deletepop = (key) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Delete',
            text: 'Are you sure ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'You have successfully Deleted.',
                    'success'
                )
                deletehandler(key)
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Failed',
                    'error'
                )
            }
        })
    }


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem', color: "#12B5B0" }}>
                <h2>User Management</h2>

                <Button variant="light" style={{ backgroundColor: "#12B5B0", color: "white" }} onClick={() => setModalShow(true)}>
                    Add Admin
                </Button>

                <Userspopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <div className="container" >
                <TableContainer component={Paper} style={{ overflowY: 'scroll', maxHeight: '20rem' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow style={{ paddingLeft: '10px' }}>
                                <StyledTableCell style={{ fontSize: '20px' }}>S.No&nbsp;</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }}>First Name&nbsp;</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }}>Last Name&nbsp;</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }}>Email&nbsp;</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }}>Password&nbsp;</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }}>Mobile Number&nbsp;</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }}>Role&nbsp;</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }}>Department&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.firstName}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.lastName}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.password}</StyledTableCell>
                                    <StyledTableCell>{row.mobile}</StyledTableCell>
                                    <StyledTableCell>{row.role}</StyledTableCell>
                                    <StyledTableCell>{row.department}</StyledTableCell>
                                    <StyledTableCell>
                                        <div>
                                            <MdIcons.MdDelete onClick={() => Deletepop(row.mobile)} style={{ paddingLeft: "0.2rem", marginTop: "0.5rem", color: "red", fontSize: "1.5rem" }} />

                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
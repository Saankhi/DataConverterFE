import React from "react";
import { useNavigate } from "react-router-dom";

export default function Mapping() {

    const navigate = useNavigate();

    const handleFilterClick = (option) => {
        console.log(option)
        // navigate('/')
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-evenly", marginLeft: '350px' }}><h1 >Field Mapping</h1>
                <a href="" style={{ marginTop: '20px' }}>Load Saved Mapping</a></div>
            <div style={{ justifyContent: 'space-between', display: 'flex', backgroundColor: 'black', color: '#fff' }}>
                <div style={{ display: 'flex', marginLeft: '40px' }}><h3>LIC Life Insurance(Output)</h3>
                </div>

                <div style={{ display: 'flex', marginRight: '40px' }}><h3> HDFC Bank Input Field</h3>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ backgroundColor: '#12B5B0', width: '500px' }} className="life">

                    <li style={{ marginTop: '10px' }}>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                    <li>
                        <select>
                            <option>select</option>
                            <option>
                                SurName
                            </option>
                            <option>FirstName</option>
                            <option>Account No</option>
                            <option>Currency</option>
                            <option>IFSC Code</option>
                            <option>Gender</option>
                            <option>Account Balance</option>
                            <option>Branch</option>
                            <option>Account Type</option>
                        </select>
                    </li><hr />

                </div>
                <div style={{ backgroundColor: '#A9ECFB', width: '500px' }} className="hdfc">

                    <li style={{ marginTop: '5px' }}>SurName</li><hr />
                    <li>FirstName</li><hr />
                    <li>Gender</li><hr />
                    <li>Account No</li><hr />
                    <li>Account Balance</li><hr />
                    <li>Currency</li><hr />
                    <li>Account Type</li><hr />
                    <li>IFSC Code</li><hr />
                    <li>Branch</li><hr />
                    <button className="save">Save</button>

                </div>
            </div>

        </>
    )
}
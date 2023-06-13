import React from "react"
import { useNavigate } from "react-router-dom";
import Template from "../Components/Template";
import Header from "../Components/Header";


export default function MyTemplates() {

    const navigate = useNavigate();

    const onHandleClick = () => {
        navigate("/template")
    }
    return (
        <>
            {/* <Header /> */}
            <div style={{ textAlign: 'right', margin: '30px', }}>
                <button style={{ backgroundColor: '#12B5B0', width: '200px', height: '40px', borderRadius: '20px', color:"white" , border:"none"}} onClick={onHandleClick}>Create New Template</button>
            </div>
            <h1 style={{ marginLeft: '30px' }}>My Templates</h1>
        </>
    )
}
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppointmentContracts } from "../contracts/appointments"
import axios from "axios";
import { useCookies } from "react-cookie";

export function EditAppointment()
{

    const[appointments,setAppointments]=useState<AppointmentContracts[]>([{Appointment_id:0,Title:'',Description:'',Date:new Date(),UserId:''}]);
    const[cookies,setCookie,removeCookie]=useCookies(['userid'])
    let params=useParams();
    let navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:3300/get-appointment/${params.id}`).then(response=>{
            setAppointments(response.data)
        })
    })
    
    const formik=useFormik({
        initialValues:{
              Appointment_id:appointments[0].Appointment_id,
              Title:appointments[0].Title,
              Description:appointments[0].Description,
              Date:appointments[0].Date,
              UserId:cookies['userid']
        },
        onSubmit:(appointment)=>{
              axios.put(`http://127.0.0.1:3300/edit-appointment/${params.id}`,appointment).then(()=>{
                alert("Appointment Details Updated");
                navigate("/appointments-dashboard")
              })
        },
        enableReinitialize: true
    })
    return(
        <div className="d-flex justify-content-center align-items-center">
             <form className="bg-light mt-4 p-4 bg-rounded" style={{width:"300px",border:"1px solid " ,borderRadius:"5px"}} onSubmit={formik.handleSubmit} >
                  <h3>Edit Appointment</h3>
                  <dl>
                    
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange} value={formik.values.Title} className="form-control"/></dd>
                    <dt>Description</dt>
                    <dd><textarea rows={3} cols={30} name="Description" onChange={formik.handleChange} value={formik.values.Description} className="form-control"></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" onChange={formik.handleChange} value={formik.values.Date.toString().slice(0,appointments[0].Date.toString().indexOf("T"))}className="form-control"/></dd>
                    
                  </dl>
                  <button className="btn btn-secondary " type="submit">Save</button>
                  <Link to="/appointments-dashboard" className="btn btn-danger mx-2" >Cancel</Link>
             </form>
        </div>
    )
}
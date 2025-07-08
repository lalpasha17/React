import { useEffect, useState } from "react";
import { useParams,Link, useNavigate } from "react-router-dom"
import { AppointmentContracts } from "../contracts/appointments";
import axios from "axios";

export function DeleteAppointment()
{
    let params=useParams();
    let navigate=useNavigate()
    const[appointments,setAppointments]=useState<AppointmentContracts[]>([{Appointment_id:0,Title:'',Description:'',Date:new Date(),UserId:''}]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:3300/get-appointment/${params.id}`).then(response=>{
            setAppointments(response.data);
        })
    })
    function handleDeleteClick()
    {
        axios.delete(`http://127.0.0.1:3300/delete-appointment/${params.id}`).then(()=>{
           navigate("/appointments-dashboard");
        })
    }
      return(
        <div className="bg-dark text-white w-25 pt-4  ">
             <h2>Delete Appointment</h2>
             <dl>
                <dt>Title</dt>
                <dd>{appointments[0].Title}</dd>
                <dt>Description</dt>
                <dd>{appointments[0].Description}</dd>
             </dl>
             <div >
               <button className="btn btn-danger me-2" onClick={handleDeleteClick}>Yes</button>
               <Link to="/appointments-dashboard" className="btn btn-primary">No</Link>
             </div>
        </div>
      )
}
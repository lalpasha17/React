import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate,Link } from "react-router-dom";
import { AppointmentContracts} from "../contracts/appointments";
import axios from "axios";
import './app-dashboard.css';

export function AppointmentDashboard()
{
    const[cookies,setCookie,removeCookie]=useCookies(['userid']);
    const[appointments,setAppointments]=useState<AppointmentContracts[]>();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:3300/appointments/${cookies['userid']}`).then(response=>{
            setAppointments(response.data);
        })
    })

    let navigate=useNavigate()
    function handleSignout()
    {
        removeCookie('userid');
        navigate('/login')
    }
    return(
        <div className="dashboard-container" >
                <iframe className="bg-anime" src="https://lottie.host/embed/de9dd45d-b9fb-42a8-8d0c-c92f0d11c11c/M7DADZH7vv.lottie" allowFullScreen></iframe>
             
            <nav className="d-flex justify-content-between ">
            
               <div className="h3 text-light mx-3">
                {cookies['userid']} -Dashboard
               </div>
               <div className="mt-3">
                <button className="btn btn-danger me-4 " onClick={handleSignout}>Signout</button>
               </div>
               
            </nav>
            <section className="mt-4">
                <div className="text-start mx-4">
                <Link to="/add-appointment" className="bi bi-calendar-date btn btn-dark">Add appointment</Link>
               </div> 
               <div className="mt-4 " >
                   {
                    appointments?.map(appointment=>
                        <div className="alert mx-4 w-50 alert-secondary" key={appointment.Appointment_id} style={{border:"1px", borderRadius:'30px'}}> 
                          <h3>{appointment.Title}</h3>
                          <p>{appointment.Description}</p>
                          <div className="bi bi-calendar-date">
                            {appointment.Date.toString()}
                            </div>
                            <div className="p-2 ">
                                <Link to={`/edit-appointment/${appointment.Appointment_id}`} className="bi bi-pen-fill btn btn-warning me-2 p-2">Edit</Link>
                                <Link to={`/delete-appointment/${appointment.Appointment_id}`} className="btn btn-danger bi bi-trash mx-2">Delete</Link>
                            </div>
                        </div>
                    )
                   }
               </div> 
            </section>
          
            
        </div>
    )
}
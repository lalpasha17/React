import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
export function AddAppointment()
{
    const[cookies,setCookie,removeCookie]=useCookies(['userid']);
    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
             Appointment_id:0,
             Title:'',
             Description:'',
             Date:'',
             UserId:cookies['userid']

        },
        onSubmit:(appointments)=>{
             axios.post(`https://backend-react-o7lg.onrender.com/add-appointment`, appointments)
.then(()=>{
                alert("appointment added successfully");
               navigate("/appointments-dashboard");
             })
        }
    })
    return(
        <div className="d-flex justify-content-center align-items-center " >
            <form className="bg-light mt-4 p-4 bg-rounded" style={{width:"300px",border:"1px solid " ,borderRadius:"5px"}} onSubmit={formik.handleSubmit}>
               <h3>Appointment</h3>
               <dl>
                
                <dt>Title</dt>
                <dd><input type="text" name="Title" className="form-control" onChange={formik.handleChange}/></dd>
                <dt>Description</dt>
                <dd><textarea rows={3} cols={30} name="Description" className="form-control" onChange={formik.handleChange}></textarea></dd>
                <dt>Date</dt>
                <dd><input type="date" name="Date" className="form-control" onChange={formik.handleChange}/></dd>
                <button  type="submit" className="btn btn-warning w-100">Add Appointment</button>
               </dl>
               <Link to="/appointments-dashboard">Back to Dashboard</Link>
            </form>
        </div>
    )
}
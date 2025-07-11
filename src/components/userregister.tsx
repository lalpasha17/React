import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import axios, { Axios } from "axios"

export function  UserRegister()
{
    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
          UserId:" ",
          UserName:" ",
          Password:" ",
          Email:" ",
          Mobile:" "
        },
        onSubmit:(data)=>{
          axios.post(`https://backend-react-o7lg.onrender.com/register-user`, data)
.then(()=>{
               alert("Registerd successfully")
            navigate("/login")
            })
            
        }
    })
    return(
        <div className="d-flex justify-content-center align-items-center " >
            <form className="alert alert-success align-content-center mt-4 p-4 bg-rounded" style={{width:"300px",border:"1px solid " ,borderRadius:"20px"}} onSubmit={formik.handleSubmit}>
                <h3><span className="bi bi-person-fill"></span>Register User</h3>
                <dl>
                    <dt>UserId</dt>
                   <dd> <input type="text" name="UserId" className="form-control" required style={{border:"1px",borderRadius:"30px"}} onChange={formik.handleChange}/></dd>
                    <dt>UserName</dt>
                   <dd><input type="text" name="UserName" className="form-control" required  style={{border:"1px",borderRadius:"30px"}} onChange={formik.handleChange} /></dd> 
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" required  style={{border:"1px",borderRadius:"30px"}} onChange={formik.handleChange}/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" className="form-control" required  style={{border:"1px",borderRadius:"30px"}} onChange={formik.handleChange}/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text"  name="Mobile" className="form-control"  required  style={{border:"1px",borderRadius:"30px"}} onChange={formik.handleChange}/></dd>
                      <button className="btn btn-danger">Register</button>
                </dl>
              
                <Link to="/" className="m-2 bi bi-house-fill btn btn-secondary" >Home</Link>
                 <Link to="/login" className="bi bi-database btn btn-dark">Have Account?</Link>
            </form>

        </div>
    )
}
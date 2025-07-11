import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useCookies } from "react-cookie";
import './userlogin.css'
export function UserLogin()
{
    let navigate=useNavigate();
     const[cookies,setCookie,removeCookie]=useCookies(['userid'])
    const formik=useFormik({
        initialValues:{
         UserId:'',
         UserName:'',
         Password:'',
         Email:'',
         Mobile:''
        },
        onSubmit:(users)=>{
               axios.get(`https://backend-react-o7lg.onrender.com/users`)
.then(response=>{
                var client=response.data.find((item:any)=>item.UserId===users.UserId);
                if(client)
                {
                    if(client.Password===users.Password)
                    {
                        setCookie("userid",users.UserId)
                         navigate("/appointments-dashboard")
                    }
                    else{
                     alert('Invalid Password')
                    }
                }
                else{
                    alert('Invalid UserId')
                }
               })
        }
    })
    return(
        <div className="d-flex justify-content-center align-items-center " style={{minHeight:'100vh'}}>
           <iframe src="https://lottie.host/embed/d1cafced-cb93-4c57-87f2-269624d578bd/upgP16hpPu.lottie" className="bg-animation">
           </iframe>
            <form className="butter align-content-center alert alert-success mt-4 p-4 bg-rounded position-relative" style={{width:"300px",border:"1px solid " ,borderRadius:"30px"}} onSubmit={formik.handleSubmit}>
                 <h3><span className="bi bi-person-circle"></span> Login</h3>
                 <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId" className="form-control " style={{border:"1px",borderRadius:"20px"}} onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" style={{border:"1px",borderRadius:"20px"}} onChange={formik.handleChange}/></dd>
                    
                    <button type="submit" className="btn btn-danger mt-2">Login</button>
                 </dl>
               <Link to="/register" style={{textDecoration:'none'}}  >Not Registered?</Link>
            </form>
           

        </div>
    )
}
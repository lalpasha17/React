import { Link } from "react-router-dom";
export function TodoIndex()
{
    return(
        <div >
           <div className="d-flex justify-content-center align-items-center " style={{height:"100vh"}} >
            <div>
                <Link to="/register" className="btn btn-dark ">NewUser Register</Link>
            <Link to="/login" className="btn btn-warning mx-2">Existing User Login</Link>
            </div> 
           </div>
        </div>
    )
}
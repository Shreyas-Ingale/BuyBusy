// imports
import { Link, useNavigate } from "react-router-dom";
import icon from "../images/Icon.png";
import { useState } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from "../context/authContext";

function SignUp() {
    //custom context
    const { signUp } = useAuthContext();
    const [values, setValues] = useState({ name: "", email: "", pswrd: "", cnfmPswrd: "" });
    const navigate = useNavigate();

    //get input values and signup and go to home page
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if (values.pswrd !== values.cnfmPswrd) {
                toast.error("Passwords do not match!");
                return;
            }
            await signUp(values);
            navigate("/");
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 text-center">
                <div className="col-lg-4 bg-white m-auto border-top border-3 rounded-top border-primary">
                    <img className="mt-4" src={icon} alt="logo" width="72" height="57" />
                    <h1 className="mb-2">Signup Now</h1>
                    <p className="text-muted lead">It's Free and takes a Minute.</p>
                    <form className="d-flex flex-column justify-content-center " onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingUsername" onChange={(e) => setValues((prev) => ({...prev, name:e.target.value}))} required />
                            <label htmlFor="floatingUsername">User Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" onChange={(e) => setValues((prev) => ({...prev, email:e.target.value}))} required />
                            <label htmlFor="floatingInput">Email Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" onChange={(e) => setValues((prev) => ({...prev, pswrd:e.target.value}))} required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingConfirmPassword" onChange={(e) => setValues((prev) => ({...prev, cnfmPswrd:e.target.value}))} required />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary w-100 py-2 fs-5 mb-3" type="submit">Sign Up</button>
                            <p className="text-center">Already Have an Account ? <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/signin">Login Here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
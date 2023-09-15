// imports
import { Link, useNavigate } from "react-router-dom";
import icon from "../images/Icon.png";
import { useAuthContext } from "../context/authContext";
import { useRef, } from "react";

function SignIn() {
    const emailRef = useRef();
    const pswrdRef = useRef();
    // custom context
    const { logIn } = useAuthContext();
    const navigate = useNavigate();

    // get input values and sign in and go to homepage
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: emailRef.current.value,
                pswrd: pswrdRef.current.value
            }
            await logIn(data);
            navigate("/");
        }
        catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 text-center">
                <div className="col-lg-4 bg-white m-auto border-top border-3 rounded-top border-primary">
                    <img className="mt-4" src={icon} alt="logo" width="72" height="57" />
                    <h1 className="mb-3">Login Now</h1>
                    <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" ref={emailRef} required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" ref={pswrdRef} required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary w-100 py-2 fs-5 mb-3" type="submit">Login</button>
                            <p className="text-center">Register Now for Free by <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/signup">Clicking Here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
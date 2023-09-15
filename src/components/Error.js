import { Link } from "react-router-dom";
import errorImg from "../images/Error.png";
import { toast } from "react-toastify";
import { useEffect } from "react";
function Error() {
    useEffect(() => {
        toast.error("This Page doesn't exists !", {
            toastId : "Error 404"
        });
    },[])
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="p-5 text-center rounded-3">
                <div>
                    <img width={300} src={errorImg} alt="Error" />
                </div>
                <h3 className="display-3 ">404 - Page not Found</h3>
                <p className="fs-5 text-muted">The page you are looking for might have been removed, had its name changed or is unavailable.</p>
                <Link to="/" className="btn btn-primary btn-lg rounded-pill" role="button">Go to Homepage</Link>
            </div>
        </div>
    )
}

export default Error;
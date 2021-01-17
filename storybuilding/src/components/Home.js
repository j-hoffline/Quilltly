import { Link } from "react-router-dom"

export default function Homepage(){
    return(
    <>
        <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <div className="w-100 text-center mt-2">
      Already have an account? <Link to="/login">Log In</Link>
    </div>
    </>
    )
}
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {

  const[error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.target)

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      await apiRequest.post("/auth/register",{
        username,
        email,
        password
      })

      navigate("/login")
    } 
    catch (error) {
    console.log(error);
    setError(error.response.data.message) 
    }finally{
      setIsLoading(false)
    }
  }

  return ( 
    <div className="Register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error &&<span>
            {error}
          </span> }
          <Link to="/login">Already have an account? Log In Now</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/public/assets/pics/Urban Hive.gif" alt="" />
      </div>
    </div>
  );
}
export default Register;

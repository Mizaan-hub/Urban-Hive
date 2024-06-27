import { Link, useNavigate } from "react-router-dom";
import "./LogIn.scss";
import { useContext, useState } from "react";
import ApiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function LogIn() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const {updateUser} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await ApiRequest.post("/auth/login", {
        username,  
        password,
      });

      // localStorage.setItem("user", JSON.stringify(res.data))
      updateUser(res.data)

      navigate("/")

      // navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="LogIn">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
          <button disabled={isLoading}>Log In</button>
          {error && 
          <span>
            {error}
          </span>}
          <Link to="/register">{"Don't"} have an account? Register Now</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/public/assets/pics/Urban Hive.gif" alt="" />
      </div>
    </div>
  );
}
export default LogIn;

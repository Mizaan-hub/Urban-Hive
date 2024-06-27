import "./Layout.scss";
import NavBar from "../../components/NavBar/NavBar";
import { Navigate, Outlet } from "react-router-dom"; // to call other elements as children in app.jsx
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout() {
  return (
    <div className="layout">
      <div className="NavBar">
        <NavBar />
      </div>
      <div className="content">
        <Outlet /> {/* To connect children elements to main layout*/}
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser 
  ? (<Navigate to={"/login"}/>) 
  :(
    <div className="layout">
      <div className="NavBar">
        <NavBar />
      </div>
      <div className="content">
        <Outlet /> {/* To connect children elements to main layout*/}
      </div>
    </div>
  );
}
export { Layout, RequireAuth };

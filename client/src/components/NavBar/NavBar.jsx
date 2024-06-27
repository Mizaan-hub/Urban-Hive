import { useContext, useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNotificationStore } from "../../lib/notificationStore.js";

function NavBar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <Link href="/" className="logo">
          <img src="/public/assets/images/logo.png" alt="" />
          <span>Urban Hive</span>
        </Link>
        <Link href="/">Home</Link>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>

      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={
                currentUser.avatar || "../../../public/assets/pics/noAvatar.jpg"
              }
            />
            <span className="username">{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notifications">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign In</a>
            <a href="/register" className="register">
              Sign Up
            </a>
          </>
        )}

        <div className="menuIcon">
          <img
            src="/public/assets/images/menu.png"
            alt=""
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          {currentUser ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <>
              <a href="/login">Sign In</a>
              <a href="/register">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

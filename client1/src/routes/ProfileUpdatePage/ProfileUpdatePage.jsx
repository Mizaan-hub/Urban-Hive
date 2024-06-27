import { useContext, useState } from "react";
import "./ProfileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import ApiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";



function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] =useState("")
  const [avatar, setAvatar] = useState([]);
  const navigate =  useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const {username, email, password} = Object.fromEntries(formData)

    try {
      
      const res = await ApiRequest.put(`/users/${currentUser.id}`,{
        username,
        email,
        password,
        avatar: avatar[0]
      })

      updateUser(res.data)
      navigate("/profile")
    } 
    catch (error) {
      console.log(error);
      setError(error.response.data.message)
    }
  }

  return (
    <div className="ProfileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] ||currentUser.avatar || "../../../public/assets/pics/noAvatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget uwConfig={{
          cloud_name: "mizaan",
          upload_preset: "UrbanHive",
          multiple: false,
          maxImageFileSize: 3000000,
          folder: "avatars"
        }}
        setState={setAvatar}
        />
      </div>
    </div>
  );
}
export default ProfileUpdatePage;

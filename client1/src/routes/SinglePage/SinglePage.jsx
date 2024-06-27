import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import "./SinglePage.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ApiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const  [saved, setSaved] = useState(post.isSaved)

  const handleSave =  async () => {

    setSaved((prev) => !prev)

    if(!currentUser){
      navigate('/login')
    }

    try {
      
      await ApiRequest.post("/users/save",{postId: post.id});
    } 
    catch (error) {
      console.log(error);
      setSaved((prev) => !prev)
    }
  }

  const handleSendMessage = async () => {
    if(!currentUser){
      navigate('/login')
      }

      const receiverId = post.user.id


      try {
        if(currentUser.id === receiverId){
          alert("You can't send message to yourself")
          console.log(currentUser.id, receiverId);
        }

        // const existingChat = await ApiRequest.get(`/chats?receiverId=${receiverId}`)

        // if(existingChat){
        //   navigate("/profile")
        // }else(
          await ApiRequest.post("/chats" , {
            receiverId,
          })
        // )
        navigate("/profile")
      } 
      catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="SinglePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/public/assets/images/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">£ {post.price}</div>
              </div>
              <div className="user">
                <img
                  src={
                    post.user.avatar ||
                    "../../../public/assets/pics/noAvatar.jpg"
                  }
                  alt=""
                />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html : 
              DOMPurify.sanitize(post.postDetail.desc),
              }}></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/public/assets/images/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/public/assets/images/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ):(
                  <p>No Pets Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/public/assets/images/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/public/assets/images/size.png" alt="" />
              <span>{post.postDetail.size} sft</span>
            </div>
            <div className="size">
              <img src="/public/assets/images/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/public/assets/images/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/public/assets/images/school.png" alt="" />
              <div className="featureText">
                <span>Schools</span>
                <p>{post.postDetail.school}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/public/assets/images/bus.png" alt="" />
              <div className="featureText">
                <span>Bus Stops</span>
                <p>{post.postDetail.bus}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/public/assets/images/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurants</span>
                <p>{post.postDetail.restaurant}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleSendMessage}>
              <img src="/public/assets/images/chat.png" alt="" />
              Send a message
            </button>
            <button onClick={handleSave} style={{
              backgroundColor: saved ? "#fece51" : "white"}}>
              <img src="/public/assets/images/save.png" alt="" />
              { saved ? "Place saved" : "Save the place" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SinglePage;

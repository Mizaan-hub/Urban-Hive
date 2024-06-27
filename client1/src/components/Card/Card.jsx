import { Link } from "react-router-dom";
import "./Card.scss";

function Card({ item }) {
  return (
    <div className="Card">
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/public/assets/images/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">£ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/public/assets/images/bed.png" alt="" />
              <span>{item.bedroom} bedrooms</span>
            </div>
            <div className="feature">
              <img src="/public/assets/images/bath.png" alt="" />
              <span>{item.bathroom} bathrooms</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/public/assets/images/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/public/assets/images/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;

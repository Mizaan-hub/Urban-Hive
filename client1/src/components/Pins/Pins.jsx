import { Marker, Popup } from 'react-leaflet'
import './Pins.scss'
import { Link } from 'react-router-dom'

function Pins ({item}){
    return(
        <Marker position={[item.latitude, item.longitude]}>
        <Popup>
            <div className="popupContainer">
                <img src={item.images[0]} alt="" />
                <div className="textContainer">
                <Link to = {`/${item.id}`}>{item.title}</Link>
                <span>{item.bedroom} bedrooms</span>
                <b>₹ {item.price}</b>
            </div>
            </div>
        </Popup>
        </Marker>
    )
}
export default Pins
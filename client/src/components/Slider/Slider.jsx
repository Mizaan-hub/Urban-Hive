import { useState } from 'react';
import './Slider.scss'

function Slider ({images}){

    const [imageIndex, setImageIndex ] = useState(null);
    const changeSlide = (direction) =>{
        if(direction==="left"){
            //login for left arrow
            if(imageIndex===0){
                setImageIndex(images.length-1)
            }else{
                setImageIndex(imageIndex-1)
            }
        }else{
            //logic for right arrow
            if(imageIndex===images.length-1){
                setImageIndex(0)
            }else{
                setImageIndex(imageIndex+1)
            }
        }
    }

    return(
        <div className='Slider'>
            {imageIndex !== null && (<div className="fullSlider">
                <div className="arrow" onClick={()=>changeSlide("left")}>
                    <img src="/public/assets/images/arrow.png" alt="" />
                </div>
                <div className="imgContainer">
                    <img src={images[imageIndex]} alt="" />
                </div>
                <div className="arrow" onClick={()=>changeSlide("right")}>
                    <img src="/public/assets/images/arrow.png" alt="" className="right" />
                </div>
                <div className="close" onClick={()=>setImageIndex(null)}>X</div>
            </div>)}
                <div className="bigImage">
                    <img src={images[0]} alt="" onClick={()=>setImageIndex(0)}/>
                </div>
                <div className="smallImages">
                    {images.slice(1).map((image,index)=>(
                        <img src={image} key={index} alt="" onClick={()=>setImageIndex(index+1)}/>
                    ))}
                </div>
        </div>
    )
}
export default Slider
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slideshow = (props) => {
  return (
    <div className="slide-container">
      <Slide easing="ease" duration={3000} arrows={true} indicators={false} autoplay={true} pauseOnHover={false} infinite={true}>
        {props.images.map((each, index) => (
          each.type === "image" ? (
            <div key={index} className="each-slide">
              <img style={{ width: "100%" }} src={each.url} alt={`Slide ${index}`} />
            </div>
          ) : (
            <div key={index} className="each-slide">
              <video autoPlay muted loop playsInline style={{ width: "100%" }}>
                <source src={each.url} type={each.url.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
              </video>
            </div>
          )
        ))}
      </Slide>
    </div>
  )
}

export default Slideshow

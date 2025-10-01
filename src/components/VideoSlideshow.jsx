import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const VideoSlideshow = (props) => {
  return (
    <div className="slide-container">
      <Slide easing="ease" duration={10000} arrows={true} indicators={false} autoplay={true} pauseOnHover={false} infinite={true}>
        {
          props.videos.map((each, index) =>
            <video autoPlay muted loop name="media" playsInline="" key={index}>
              <source src={each} type="video/webm" />
            </video>
          )
        }
      </Slide>
    </div>
  )
}

export default VideoSlideshow
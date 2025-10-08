import React, { useState, useEffect } from 'react';
import ImgPrev from "/src/assets/svg/chevron-left.svg";
import ImgNext from "/src/assets/svg/chevron-right.svg";

const Slideshow = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (props.images.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [props.images.length, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? props.images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === props.images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div 
      className="slide-container" 
      style={{ position: 'relative', height: 'auto' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slideshow-wrapper" style={{ height: 'auto', overflow: 'hidden' }}>
        <div className="slides" style={{ 
          height: 'auto', 
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`
        }}>
          {props.images.map((each, index) => (
            <div
              key={index}
              className="slide"
              style={{
                flex: '0 0 100%',
                height: 'auto',
                minWidth: 0
              }}
            >
              {each.type === "image" ? (
                <img 
                  style={{ 
                    width: "100%", 
                    height: 'auto', 
                    display: 'block'
                  }} 
                  src={each.url} 
                  alt={`Slide ${index}`} 
                />
              ) : (
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  style={{ 
                    width: "100%", 
                    height: 'auto',
                    display: 'block'
                  }}
                >
                  <source src={each.url} type={each.url.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
                </video>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {props.images.length > 1 && (
        <>
          <button 
            className="slide-nav prev" 
            onClick={goToPrevious}
          >
            <img src={ImgPrev} width={25} height={25} />
          </button>
          <button 
            className="slide-nav next" 
            onClick={goToNext}
          >
            <img src={ImgNext} width={25} height={25} />
          </button>
        </>
      )}
    </div>
  )
}

export default Slideshow

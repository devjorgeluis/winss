import {React, useState} from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imgItem1 from '/src/assets/img/spaceman-2.png';
import imgItem2 from '/src/assets/img/title-spaceman.png';
import imgItem3 from '/src/assets/img/logo-aviator.png';
import imgItem4 from '/src/assets/img/aviator-girl.png';
import imgItem5 from '/src/assets/img/logo-xplorer.webp';
import imgItem6 from '/src/assets/img/pipa-logo.png';
import imgItem7 from '/src/assets/img/pipa-item.avif';

const CrashSlideshow = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      containerClass: 'crash1',
      items: [
        { className: 'item item-2', src: imgItem1 },
        { className: 'item item-3', src: imgItem2 },
        { className: 'item item-0', src: null }
      ]
    },
    {
      containerClass: 'crash2',
      items: [
        { className: 'item item-5', src: imgItem3 },
        { className: 'item item-4', src: imgItem4 },
        { className: 'item item-0a', src: null }
      ]
    },
    {
      containerClass: 'crash3',
      items: [
        { className: 'item item-6', src: imgItem5 },
        { className: 'item item-0b', src: null }
      ]
    },
    {
      containerClass: 'crash4',
      items: [
        { className: 'item item-7', src: imgItem6 },
        { className: 'item item-8', src: imgItem7 },
        { className: 'item item-0c', src: null }
      ]
    }
  ];

  const slideProperties = {
    easing: "ease",
    duration: 10000,
    arrows: true,
    indicators: false,
    autoplay: true,
    pauseOnHover: false,
    infinite: true,
    onChange: (previous, next) => {
      setCurrentSlide(next);
    }
  };

  return (
    <div className="slide-container crash-slideshow">
      <Slide {...slideProperties}>
        {slides.map((slide, index) => (
          <div 
            className="carousel-item" 
            key={`slide-${currentSlide === index ? 'active' : 'inactive'}-${index}`}
          >
            <div className={slide.containerClass}>
              {slide.items.map((item, itemIndex) => (
                <div key={`item-${index}-${itemIndex}`} className={item.className}>
                  {item.src && <img width="100%" src={item.src} alt="" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  )
}

export default CrashSlideshow
import {React, useState} from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imgItem1 from '/src/assets/img/bg-2a.png';
import imgItem2 from '/src/assets/img/bg-3.png';
import imgItem3 from '/src/assets/img/bg-5a.png';
import imgItem4 from '/src/assets/img/bg-6a.png';
import imgItem5 from '/src/assets/img/bg-8a.png';
import imgItem6 from '/src/assets/img/bg-9a.png';

const HalloweenSlideshow = (props) => {
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
        { className: 'item item-7', src: imgItem5 },
        { className: 'item item-8', src: imgItem6 },
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
    <div className="slide-container halloween-slideshow">
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

export default HalloweenSlideshow
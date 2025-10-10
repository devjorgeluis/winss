import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const TopGameSlideshow = (props) => {
  const { contextData } = useContext(AppContext);
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleGameClick = (game, index) => {
    if (!props.isLogin && props.handleLoginClick) {
      props.handleLoginClick();
    } else if (props.launchGame) {
      props.launchGame(game, "slot", "tab");
    } else {
      console.log('Launching game:', game);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const onSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="containerSliders">
      {
        props.games.length > 0 && <button className="swiper-button-prev" onClick={handlePrev} disabled={isBeginning ? true : false}></button>
      }
      
      <Swiper
        ref={swiperRef}
        onSlideChange={onSlideChange}
        spaceBetween={10}
        slidesPerView={1}
        watchOverflow={true}
        observer={true}
        observeParents={true}
        breakpoints={{
          320: {
            slidesPerView: 1
          },
          576: {
            slidesPerView: 4
          },
          1024: {
            slidesPerView: 6
          },
          1600: {
            slidesPerView: 8
          },
          1601: {
            slidesPerView: 10
          },
        }}
      >
        {props.games && props.games.map((game, index) => (
          <SwiperSlide key={`game-${game.id || index}`}>
            <div
              className="slots-grid-item swiper-slide otros"
              onClick={() => handleGameClick(game, index)}
              style={{
                cursor: 'pointer',
                backgroundImage: `url(${game.image_local && game.image_local !== ""
                    ? contextData.cdnUrl + game.image_local
                    : game.image_url
                  })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '150px',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {
        props.games.length > 0 && <button className="swiper-button-next" onClick={handleNext} disabled={isEnd ? true : false}></button>
      }
    </div>
  )
}

export default TopGameSlideshow

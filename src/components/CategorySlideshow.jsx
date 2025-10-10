import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import CategoryButton from "../components/CategoryButton";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CategorySlideshow = (props) => {
  const { contextData } = useContext(AppContext);
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!props.categories || props.categories.length === 0) {
    return null;
  }

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

  const handleCategoryClick = (category, index) => {
    if (props.pageType === 'home') {
      navigate(`/casino?provider=${encodeURIComponent(category.name)}&providerId=${category.id}`);
    } else {
      if (props.onCategoryClick) {
        props.onCategoryClick(category, category.id, category.table_name, index, true);
        setIsOpen(false);
      }
      if (props.onCategorySelect) {
        props.onCategorySelect(category);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <div className={isOpen ? "menu-provider mt-2 open" : "menu-provider mt-2"}>
        <div className="mobile-all">
          <div className="provider-title-sub-home"><i className="fas fa-home"></i></div>
          <div className="provider-title-sub-first">Todos los juegos</div>
        </div>

        <div className="menu-all">
          {isOpen ? (
            <div id="menu-scroll" className={isOpen ? "edit" : ""}>
              {props.categories.map((category, index) => (
                <div
                  key={index}
                  className={props.selectedCategoryIndex === index ? "provider-title-sub_active provider-title-sub" : "provider-title-sub"}
                  active={(props.selectedCategoryIndex === index).toString()}
                  onClick={() => handleCategoryClick(category, index)}
                >
                  <p className="menu-provider-title">
                    {category.name}
                  </p>
                </div>
              ))}
              <div className="click-closed visible" onClick={() => setIsOpen(false)}>
                <i className="fas fa-angle-up"></i>
              </div>
            </div>
          ) : (
            <>
              <i
                onClick={handlePrev}
                className="fa fa-arrow-circle-left"
                disabled={isBeginning ? true : false}
              ></i>

              <Swiper
                ref={swiperRef}
                onSlideChange={onSlideChange}
                className="menu-scroll"
                spaceBetween={3}
                slidesPerView={'auto'}
              >
                {props.categories.map((category, index) => (
                  <SwiperSlide key={`category-${category.id || index}`} style={{ width: 'auto', maxWidth: '120px' }}>
                    <CategoryButton
                      name={category.name}
                      icon={
                        category.image_local && category.image_local !== ""
                          ? contextData.cdnUrl + category.image_local
                          : category.image_url
                      }
                      active={props.selectedCategoryIndex === index}
                      onClick={() => handleCategoryClick(category, index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <i
                onClick={handleNext}
                className="fa fa-arrow-circle-right"
                disabled={isEnd ? true : false}
              ></i>
            </>
          )}
        </div>
      </div>
      {
        !isOpen && <div className="menu-click" onClick={() => setIsOpen(true)}>
          <i className="fas fa-angle-down"></i>
        </div>
      }
    </>
  )
}

export default CategorySlideshow
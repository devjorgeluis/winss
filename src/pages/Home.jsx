import VideoSlideshow from "../components/VideoSlideshow";
import VideoBanner1 from "/src/assets/video/slot-wins.webm";
import VideoBanner2 from "/src/assets/video/deportes-winss.webm";
import VideoBanner3 from "/src/assets/video/hipismo-wins.webm";
import VideoBanner4 from "/src/assets/video/poker-winss.webm";
import VideoBanner5 from "/src/assets/video/ruleta-winss.webm";
import VideoBanner6 from "/src/assets/video/bingo-winss.webm";

import ImgGif1 from "/src/assets/img/item-1.gif";
import ImgGif2 from "/src/assets/img/item-2.gif";
import ImgGif3 from "/src/assets/img/item-3.gif";
import ImgGif4 from "/src/assets/img/item-4.gif";
import ImgGif5 from "/src/assets/img/item-5.gif";
import ImgGif6 from "/src/assets/img/item-6.gif";
import ImgBanner from "/src/assets/img/bann-bottom.png";

const Home = () => {
  let videoSlideshow = [VideoBanner1, VideoBanner2, VideoBanner3, VideoBanner4, VideoBanner5, VideoBanner6];

  const categories = [
    { id: 1, name: "Poker", image: ImgGif1 },
    { id: 2, name: "Slots", image: ImgGif2 },
    { id: 3, name: "Caballos", image: ImgGif3 },
    { id: 4, name: "E-sports", image: ImgGif4 },
    { id: 5, name: "Virtuales", image: ImgGif5 },
    { id: 6, name: "Video Bingo", image: ImgGif6 }
  ];

  return (
    <>
      <>
        <VideoSlideshow videos={videoSlideshow} />

        <div className="container container-winss">
          <div className="row">
            {
              categories.map((category, index) => 
                <div className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 mb-3" key={index}>
                  <a href="#" className="text-center">
                    <img className="d-block w-100" src={category.image} />
                    <h5>{category.name}</h5>
                  </a>
                </div>
              )
            }
            <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block col-md-12 col-lg-12 col-xl-12">
              <img className="d-block w-100" src={ImgBanner} alt="First slide" />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Home;

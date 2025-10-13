import { useLocation } from "react-router-dom";
import ImgPumpkin from "/src/assets/img/pumpkin.png";

const LiveGameCard = (props) => {
  const location = useLocation();
  const isLiveCasino = location.pathname === "/live-casino";

  return (
    <div className="image-box slots-grid-item otros" title={props.title} onClick={props.onClick}>
      <div className="image-container">
        <img className="imgslot" src={props.imageSrc} alt={props.title} loading="lazy" />
        {
          isLiveCasino && <span className="gamename">{props.title}</span>
        }

        <div className="play-button">
          {
            isLiveCasino ? <i className="fas fa-play-circle"></i> : <img src={ImgPumpkin} alt="Play" height={50} />
          }
        </div>
      </div>
    </div>
  );
};

export default LiveGameCard;

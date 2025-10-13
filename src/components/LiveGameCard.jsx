import { useLocation } from "react-router-dom";
import ImgPumpkin from "/src/assets/img/pumpkin.png";

const LiveGameCard = (props) => {
  const location = useLocation();
  const isLiveCasino = location.pathname === "/live-casino";
  const isHallo = location.pathname === "/halloween";
  const isCrash = location.pathname === "/crash";

  return (
    <div className="image-box slots-grid-item otros" title={props.title} onClick={props.onClick}>
      <div className="image-container">
        <img className="imgslot" src={props.imageSrc} alt={props.title} loading="lazy" />
        {
          isLiveCasino && <span className="gamename">{props.title}</span>
        }

        { isLiveCasino && <div className="play-button"><i className="fas fa-play-circle"></i></div> }
        { isHallo && <div className="play-button"><img src={ImgPumpkin} alt="Play" height={50} /></div> }
        { isCrash && <button type="button" className="btn button-play">Jugar</button> }
      </div>
    </div>
  );
};

export default LiveGameCard;

const LiveGameCard = (props) => {
  return (
    <div className="image-box slots-grid-item otros" title={props.title} onClick={props.onClick}>
      <div className="image-container">
        <img className="imgslot" src={props.imageSrc} alt={props.title} loading="lazy" />
        <span className="gamename">{props.title}</span>
        <div className="play-button"><i className="fas fa-play-circle"></i></div>
        {/* <div class="loading-spinner" style="display: none;"></div> */}
      </div>
    </div>
  );
};

export default LiveGameCard;

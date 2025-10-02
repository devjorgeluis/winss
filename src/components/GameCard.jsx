const GameCard = (props) => {
  return (
    <div className="slots-grid-item otros" title={props.title} onClick={props.onClick}>
      <img className="imgslot" src={props.imageSrc} alt={props.title} loading="lazy" />
    </div>
  );
};

export default GameCard;

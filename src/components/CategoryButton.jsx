const CategoryButton = (props) => {
  let customClass = "provider-title-sub";
  if (props.active == true) {
    customClass += " provider-title-sub_active";
  }

  return (
    <div className={customClass} onClick={props.onClick}>
      {/* <div>
        {
          props.icon && props.icon !== "" &&
          <img
            alt={props.name}
            loading="lazy"
            width="20"
            height="20"
            decoding="async"
            src={props.icon}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        }
      </div> */}
      <p className="menu-provider-title">{props.name}</p>
    </div>
  );
};

export default CategoryButton;

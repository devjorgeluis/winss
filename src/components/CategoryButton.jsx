const CategoryButton = (props) => {
  let customClass = "provider-title-sub";
  if (props.active == true) {
    customClass += " provider-title-sub_active";
  }

  return (
    <div className={customClass} onClick={props.onClick}>
      <p className="menu-provider-title">{props.name}</p>
    </div>
  );
};

export default CategoryButton;

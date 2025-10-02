const NavLinkIcon = (props) => {
  let customClass = "provider-title p-0";
  if (props.active) {
    customClass += " provider-title_active";
  }

  return (
    <div className={customClass} onClick={props.onClick}>
      <a className="p-0">
        <img src={props.icon} alt={props.title} />
        <div>{props.title}</div>
      </a>
    </div>
  );
};

export default NavLinkIcon;
import { NavLink } from "react-router-dom";

const NavLinkHeader = (props) => {
    return (
        <li>
            <NavLink
                to={props.pageCode === "home" ? "/" : `/${props.pageCode}`}
                className={({ isActive }) =>
                    `btn-menu-cj button type1 ${isActive ? "active-menu-item" : ""}`
                }
                onClick={props.onClick}
            >
                {props.title}
            </NavLink>
        </li>
    );
};

export default NavLinkHeader;

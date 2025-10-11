import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavLinkHeader = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = (e) => {
        if (props.pageCode === "") {
            e.preventDefault();
            setShowDropdown(!showDropdown);
        } else if (props.onClick) {
            props.onClick(e);
        }
    };

    const handleDropdownItemClick = (pageCode) => {
        setShowDropdown(false);
        if (props.getPage) {
            props.getPage(pageCode);
        }
    };

    if (props.pageCode === "") {
        return (
            <li className="dropdown-container">
                <a
                    href="#"
                    className={`btn-menu-cj button type1 ${showDropdown ? "active-menu-item" : ""}`}
                    onClick={handleClick}
                >
                    {props.title}
                </a>
                {showDropdown && (
                    <ul className="nav">
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("live-casino")}
                            >
                                Casino En Vivo
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("sports")}
                            >
                                Deportes
                            </a>
                        </li>
                    </ul>
                )}
            </li>
        );
    }

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

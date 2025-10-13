import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const NavLinkHeader = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(() => {
        return typeof window !== 'undefined' ? window.innerWidth <= 767 : false;
    });

    useEffect(() => {
        const checkIsMobile = () => {
            return window.innerWidth <= 767;
        };

        setIsMobile(checkIsMobile());

        const handleResize = () => {
            setIsMobile(checkIsMobile());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = (e) => {
        if (props.pageCode === "#") {
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

    if (props.pageCode === "#") {
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
                        {
                            isMobile && <li>
                                <a
                                    href="#"
                                    onClick={() => handleDropdownItemClick("live-casino")}
                                >
                                    Casino En Vivo
                                </a>
                            </li>
                        }
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("live-sports")}
                            >
                                Deportes en vivo
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
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("")}
                            >
                                Ruleta en Español
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("")}
                            >
                                Caballos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("")}
                            >
                                Crash Games
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("")}
                            >
                                Video Bingo
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("")}
                            >
                                Raspaditas
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleDropdownItemClick("")}
                            >
                                Virtuales
                            </a>
                        </li>
                    </ul>
                )}
            </li>
        );
    }

    if (props.pageCode === "") {
        return (
            <li>
                <a
                    href="#"
                    className="btn-menu-cj button type1"
                    onClick={(e) => {
                        e.preventDefault();
                        if (props.onClick) {
                            props.onClick(e);
                        }
                    }}
                >
                    {
                        props.icon && <img src={props.icon} width={20} height={20} className="icon-HALLOWEEN" />
                    }
                    {props.title}
                </a>
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
                {
                    props.icon && <img src={props.icon} width={20} height={20} className="icon-HALLOWEEN" />
                }
                {props.title}
            </NavLink>
        </li>
    );
};

export default NavLinkHeader;

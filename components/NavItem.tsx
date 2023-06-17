// source: https://codewithmarish.com/post/how-to-create-responsive-navbar-in-next-js

import Link from "next/link";
import { useState } from "react";

const NavItem = ({ text, href, active, dropdownItems, subhref }) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleMouseEnter = () => {
    setDropdownActive(true);
  };

  const handleMouseLeave = () => {
    setDropdownActive(false);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <Link
      href={href}
      className={`nav__item ${active ? "active" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {text}
        {dropdownItems && (
          <span
            className={`nav__dropdown-icon ${dropdownActive ? "active" : ""}`}
          ></span>
        )}
      </div>
      {dropdownItems && dropdownActive && (
        <div className={`nav__dropdown-menu backdrop-filter backdrop-blur-lg`}>
          {dropdownItems.map((item, idx) => (
            <Link href={subhref[idx]} className={`nav__dropdown-menu-titles`}>
              {item}
              <br />
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
};

export default NavItem;

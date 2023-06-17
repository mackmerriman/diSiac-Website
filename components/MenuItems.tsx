import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import Link from "next/link";

const MenuItems = ({ darkMode, items, depthLevel }) => {
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
    <div
      className={`${darkMode ? "menu-items-dark" : "menu-items"} backdrop-filter backdrop-blur-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleDropdown}
    >
      {items.submenu ? (
        <>
          <Link href={items.url}>{items.name}</Link>
          <div 
            aria-haspopup="menu"
            aria-expanded={dropdownActive ? "true" : "false"}
          >
          <Dropdown darkMode={darkMode} submenus={items.submenu} dropdown={dropdownActive} depthLevel={depthLevel}/>
          </div>
        </>
      ) : (
        <Link href={items.url}>{items.name}</Link>
      )}
    </div>
  );
};

export default MenuItems;
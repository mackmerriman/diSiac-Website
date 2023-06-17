import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import Link from "next/link";

const MenuItemsMobile = ({ updateExpanded, darkMode, items, depthLevel }) => {
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

  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
    updateExpanded(isShowing);
  };

  return (
    <div
      className={`${darkMode ? "menu-items-dark" : "menu-items"} ${isShowing ? 'accordion-expand': ''} text-xl font-medium my-4 flex justify-between items-center`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleDropdown}
    >
      {items.submenu ? (
        <>
            <button
                style={{
                width: "100%",
                position: "relative",
                textAlign: "left",
                }}
                onClick={toggle}
                type="button"
            >
                <div className="uppercase">{items.name}</div>
                <div aria-haspopup="menu" aria-expanded={dropdownActive ? "true" : "false"} className={`${isShowing ? 'accordion' : 'hidden'}`}>
                    <Dropdown darkMode={darkMode} submenus={items.submenu} dropdown={isShowing} depthLevel={depthLevel}/>
                </div>
          </button>
          <svg className="w-4 h-4 mx-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </>
      ) : (
        <Link href={items.url}>{items.name} </Link>
      )}
    </div>
  );
};

export default MenuItemsMobile;
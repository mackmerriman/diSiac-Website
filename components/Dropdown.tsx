import MenuItems from "./MenuItems";

const Dropdown = ({ darkMode, submenus, dropdown, depthLevel }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

    return (
    <div className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""} backdrop-filter backdrop-blur-lg`}>
        {submenus.map((submenu, index) => (
         <MenuItems darkMode={darkMode} items={submenu} key={index} depthLevel={depthLevel} />
        ))}
    </div>
    );
  };
  
  export default Dropdown;
// source: https://codewithmarish.com/post/how-to-create-responsive-navbar-in-next-js

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import NavItem from "./NavItem";
import MenuItems from './MenuItems';
import MenuItemsMobile from './MenuItemsMobile';
import SocialMedia from "./SocialMedia";
import {isMobile} from 'react-device-detect';

const MENU_LIST = [
  { 
    name: "Home", 
    url: "/",
  },
  {
    name: "About",
    url: "/about",
    submenu: [
      {
        name: 'About',
        url: '/about',
      },
      {
        name: 'Members',
        url: '/members',
      },
      {
        name: 'Alumni',
        url: '/alumni',
      },
      {
        name: 'Media',
        url: '/media',
      },
    ],
  },
  {
    name: "Projects",
    url: "/projects",
    submenu: [
      {
        name: "Shows",
        url: "/shows",
        submenu: [
          {
            name: "[AU]RUM",
            url: "/shows/showsnumber?id=2201",
          },
          {
            name: "HEADLINES",
            url: "/shows/showsnumber?id=2200",
          },
          {
            name: "360°",
            url: "/shows/showsnumber?id=2101",
          },
          {
            name: "REVERIE",
            url: "/shows/showsnumber?id=2100",
          },
          {
            name: "OBLIVION",
            url: "/shows/showsnumber?id=1901",
          },
          {
            name: "DRIP",
            url: "/shows/showsnumber?id=1900",
          },
          {
            name: "2.0",
            url: "/shows/showsnumber?id=1801",
          },
          {
            name: "STRIPPED",
            url: "/shows/showsnumber?id=1800",
          },
          {
            name: "CHROMA",
            url: "/shows/showsnumber?id=1701",
          },
        ],
      },
      {
        name: "Workshops",
        url: "/workshops",
        submenu: [
          {
            name: "Winter 2020",
            url: "/workshops/workshopyear?id=Winter+2020",
          },
          {
            name: "Winter 2019",
            url: "/workshops/workshopyear?id=Winter+2019",
          },
          {
            name: "Winter 2018",
            url: "/workshops/workshopyear?id=Winter+2018",
          },
          {
            name: "Spring 2017",
            url: "/workshops/workshopyear?id=Spring+2017",
          },
          {
            name: "Winter 2017",
            url: "/workshops/workshopyear?id=Winter+2017",
          },
        ],
      },
      {
        name: "Conceptual",
        url: "/conceptual",
        submenu: [
          {
            name: "Spring 2022",
            url: "/conceptual/conceptualyear?id=2022",
          },
          {
            name: "Spring 2021",
            url: "/conceptual/conceptualyear?id=2021",
          },
          // {
          //   name: "Spring 2020",
          //   url: "conceptual/conceptualyear?id=2020",
          // },
          {
            name: "Summer 2018",
            url: "/conceptual/conceptualyear?id=2018",
          },
        ],
      },
    ],
  },
  {
    name: "Events",
    url: "/events",
  },
  {
    name: "Contact",
    url: "/contact",
  },
  {
    name: "Admin",
    url: "/admin",
  },
];

type Props = {
  shouldBeDark?: boolean;
};

const Navigation: React.FC<Props> = ({shouldBeDark}) => {
  const scrollDirection = useScrollDirection();
  const darkMode = (shouldBeDark ? shouldBeDark : changeColor());

  const [width, setWidth] = React.useState(0);
	  React.useEffect(() => {
	    setWidth(window.innerWidth);
	});
  const isMobile = width < 800;

  const [open, setOpen] = useState(false);
  const navbarCollapsed = collapseNavbar();

  return (
    <header className={`w-full ${darkMode ? "bg-white shadow-xl" : "backdrop-filter backdrop-blur-lg"} fixed z-10 trasition ease-in-out duration-500 ${ scrollDirection === "down" ? "-top-24" : "top-0"}`}>
      <div className="max-w-7xl mx-auto">
        <nav className={`flex max-w-screen-xl mx-auto items-center justify-between px-8 trasition ease-in-out duration-500`}>
          {
            darkMode ? 
              <Link href={"/"}>
                <Image
                  src="/disiac-logo-web-header-black.png"
                  alt="diSiac Dance Company"
                  width={100}
                  height={30}
                />
              </Link>
            :
              <Link href={"/"}>
                <Image
                  src="/disiac-logo-web-header.png"
                  alt="diSiac Dance Company"
                  width={100}
                  height={30}
                />
              </Link>
          }
          {
          navbarCollapsed || isMobile
          ?  
          <div className="flex align-right items-center text-sm">
            <div className={`nav__menu-list ${darkMode ? "text-black" : "text-white"}`}>
              <MobileNav open={open} setOpen={setOpen} darkMode={shouldBeDark}/> 
              <div className={`z-50 flex relative w-8 h-8 flex-col justify-between items-center ${isMobile ? 'visible' : "hidden"}`} onClick={() => {
                    setOpen(!open)
                }}>
                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
              </div>
            </div>
          </div>
          : 
            /* Desktop Version */
            <div className="flex align-right items-center text-sm">
            <div className={`nav__menu-list ${darkMode ? "text-black" : "text-white"}`}>
              {MENU_LIST.map((menu, index) => {
                const depthLevel = 0;
                return <MenuItems darkMode={darkMode} items={menu} key={index} depthLevel={depthLevel}/>;
              })}
              <div className={`z-50 flex relative w-8 h-8 flex-col justify-between items-center ${navbarCollapsed ? 'visible' : "hidden"}`} onClick={() => {
                    setOpen(!open)
                }}>
                {/* hamburger button */}
                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
              </div>
            </div>
            <SocialMedia isDarkMode={darkMode} />
            </div>
          }
        </nav>
      </div>
    </header>
  );
};

function MobileNav({open, setOpen, darkMode}) {
  const [isExpanded, setExpanded] = useState(false);
  const updateExpanded = (shouldExpand) => {
    setExpanded(shouldExpand);
  };

  return (
      <div className={`absolute top-0 left-0 w-screen bg-white text-black transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
          <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
            <Link href={"/"}>
              <Image
                src="/disiac-logo-web-header-black.png"
                alt="diSiac Dance Company"
                width={100}
                height={30}
              />
            </Link>
          </div>
          <div className="flex flex-col ml-4">
              {MENU_LIST.map((menu, index) => {
                const depthLevel = 0;
                return <MenuItemsMobile updateExpanded={updateExpanded} darkMode={darkMode} items={menu} key={index} depthLevel={depthLevel}/>;
              })}
          </div>  
      </div>
  )
}

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

function changeColor() {
  const [color, setColor] = useState(false);

    useEffect(() => {
    const changeColor = () => {

      if (window.scrollY >= 900) {
        setColor(true);
      } else {
        setColor(false);
      } 
    };
    window.addEventListener("scroll", changeColor);
  }, [color]);
  return color;
}

function collapseNavbar() {
  const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
    const collapseNavbar = () => {

      if (window.innerWidth <= 885) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      } 
    };
    window.addEventListener("resize", collapseNavbar);
  }, [collapsed]);
  return collapsed;
}

export default Navigation;

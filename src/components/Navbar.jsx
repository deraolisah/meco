import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useLocation } from "react-router-dom";


const Navbar = () => {
  const navList = [
    { name: "Releases", href: "/releases" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Shop", href: "/shop" }
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Refs
  const borderRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemRefs = useRef([]);
  menuItemRefs.current = [];
  const toggleIconRef = useRef(null);
  const menuContainerRef = useRef(null);

  // Initial animations (logo, toggle, border)
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Animate menu items with stagger
    gsap.fromTo(
      menuItemRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.45,
        ease: 'power2.out',
        stagger: 0.25,
      }
    );

    gsap.fromTo(
      toggleIconRef.current,
      { scale: 0.8, y: 10, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      borderRef.current,
      { width: '0%' },
      { width: '100%', duration: 1, delay: 0.65, ease: 'power2.out' }
    );
  }, []);

  // Menu open/close animations
  useEffect(() => {
    if (menuOpen) {
      const tl = gsap.timeline();

      // Slide in menu container
      tl.fromTo(
        menuContainerRef.current,
        { x: '100%' },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      // tl.fromTo(
      //   menuContainerRef.current,
      //   { y: 30, opacity: 0 },
      //   { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15 }
      // );

      // Stagger menu items
      tl.fromTo(
        menuItemRefs.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
        },
        "-=0.2" // overlap slightly with container animation
      );
    } else {
      // Animate closing (slide out)
      gsap.to(menuContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.in',
        // stagger: 0.25
      });
    }
  }, [menuOpen]);

  return (
    <nav className="w-full pb-4 flex flex-wrap items-center justify-between relative">
      <a ref={logoRef} href="/" className="text-lg font-bold">Meco Club</a>

      <button
        ref={toggleIconRef}
        className={`z-50 cursor-pointer text-sm flex md:hidden font-medium ${menuOpen ? "fixed right-4" : ""}`}
        onClick={toggleMenu}
      >
        {!menuOpen ? (
          <span title="open menu" className='flex items-center gap-1'>
            <span className='flex flex-col gap-1'>
              <span className='w-4 h-0.5 bg-black flex rounded-full'></span>
              <span className='w-4 h-0.5 bg-black flex rounded-full'></span>
            </span>
            Menu 
          </span>
        ) : (
          <span title="close menu" className="border-b border-gray-500"> Close </span>
        )}
      </button>

      {menuOpen && (
        <div
          className="fixed md:hidden top-0 left-0 z-10 w-full h-full bg-black/50 backdrop-blur-xs cursor-pointer"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <ul
        ref={menuContainerRef}
        className={`z-40 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-6 fixed md:relative top-0 pt-15 md:top-0 right-[-100%] md:right-0 h-full w-68 md:w-fit p-4 md:p-0 bg-white md:bg-transparent transition-all duration-700 ${menuOpen ? "!right-0" : ""}`}
        style={{ transform: 'translateY(110%)', opacity: '0' }} 
      >
        {/* {["Releases", "About", "Contact", "Shop"].map((item, index) => { */}
        {navList.map((item, index) => {
          const path = `/${item.name.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <a
              key={item}
              href={item.href}
              className={`text-3xl md:text-base font-semibold w-fit group relative inline-block h-8 md:h-6 overflow-y-hidden transition-all duration-400 scrollbar-hidden
                ${isActive ? "text-gray-400 underline-0 md:underline" : "hover:text-gray-400 md:hover:underline"}
              `}
              ref={el => menuItemRefs.current[index] = el}
            >
              {/* Original text */}
              <span className="w-full block transition-transform duration-300 group-hover:-translate-y-full">
                {item.name}
              </span>
              {/* Duplicate text sliding in */}
              <span className="w-full block absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full">
                {item.name}
              </span>
              {/* {item.name} */}
              <hr className="w-full md:hidden border-gray-400" />
            </a>
          );
        })}
      </ul>

      <div ref={borderRef} className="absolute bottom-0 left-0 h-[1px] bg-gray-300"></div>
    </nav>
  );
};

export default Navbar;
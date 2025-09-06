import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // GSAP ANIMATIONS
  const borderRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemRefs = useRef([]);
  menuItemRefs.current = [];

  const toggleIconRef = useRef(null);

  useEffect(() => {
     // Animate logo
    gsap.fromTo(
      logoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', }
    );

    // Animate Menu Button
    gsap.fromTo(
      toggleIconRef.current,
      { scale: 0.6, rotate: -20, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' }
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
        stagger: 0.15,
      }
    );

    // Animate border
    gsap.fromTo(
      borderRef.current,
      { width: '0%' },
      { width: '100%', duration: 1, delay: 0.65, ease: 'power2.out' }
    );
  }, []);




  return (
    <nav className='w-full pb-4 flex flex-wrap items-center justify-between relative'>
      <a ref={logoRef} href='/' className='text-lg font-bold'> Meco Club </a>

      <div 
        ref={toggleIconRef} 
        className='flex md:hidden cursor-pointer bg-gray-300 rounded-full text-lg items-center justify-center font-normal' 
        onClick={toggleMenu} 
        title='menu'>
          {menuOpen ? 
          <span className='p-1 px-3.5 text-3xl'> × </span> 
          : 
          // <span className='p-2'> {'>_<'} </span>
          <span className='p-1 px-3.5 text-3xl'> {'='} </span>
          }
      </div>


      <ul className={`md:max-h-fit flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-6 font-semibold w-full md:w-fit overflow-hidden transition-all duration-200 ${menuOpen ? "max-h-auto" : "max-h-0"}`}>
        {["Releases", "History", "Store", "Contact"].map((item, index) => (
          <a key={item} href={`/${item.toLowerCase()}`} className='w-full md:w-fit text-end hover:text-gray-400 mt-4.5 md:mt-0' ref={el => menuItemRefs.current[index] = el}>
            {item}
          </a>
        ))}
      </ul>

      <div ref={borderRef} className="absolute bottom-0 left-0 h-[1px] bg-gray-300"></div>
    </nav>
  )
}

export default Navbar;
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  // GSAP ANIMATIONS
  const borderRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemRefs = useRef([]);
  menuItemRefs.current = [];

  useEffect(() => {
    // Animate border
    gsap.fromTo(
      borderRef.current,
      { width: '0%' },
      { width: '100%', duration: 1, delay: 0.4, ease: 'power2.out' }
    );

    // Animate logo
    gsap.fromTo(
      logoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );

    // Animate menu items with stagger
    gsap.fromTo(
      menuItemRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        delay: 0.4
      }
    );
  }, []);




  return (
    <nav className='w-full pb-4 flex flex-wrap items-center justify-between relative'>
      <a ref={logoRef} href='/' className='text-lg font-bold'> Meco Club </a>

      <div className='flex md:hidden cursor-pointer bg-gray-300 p-1.5' onClick={toggleMenu} title='menu'>
        {!menuOpen ? (
          <div className='text-5xl w-4 h-4 flex items-center justify-center font-normal'>
            {/* <span className='h-0.5 w-5.5 bg-black rounded-full'></span>
            <span className='h-0.5 w-5.5 bg-black rounded-full'></span> */}
            =
          </div>
        ) : (
          <div className='text-5xl w-4 h-4 flex items-center justify-center font-normal '>
            ×
          </div>
        )}
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
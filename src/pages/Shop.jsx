import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import img1 from "../assets/amara-patel.jpeg";
import img2 from "../assets/echo-lume.png";
import img3 from "../assets/luna-deluxe.png";

const Shop = () => {

  const headerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate Header
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' }
    );
    // Animate Text
    gsap.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.88, delay: 1.2 },
    );
  }, []);

  return (
    <section className='relative'>
      <div className='border-b border-gray-300 w-full flex items-center justify-between h-14 sticky top-0'>
        <div className='cursor-pointer'> Search </div>
        <div className='cursor-pointer'> Cart (0) </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-300 text-center">
        <div className='bg-gray-50 p-2 pb-0 space-y-2 relative group'>
          <img src={img1} alt='' className='w-full h-80 object-top object-cover' />
          <p className='absolute left-0 bottom-0 w-full group-hover:h-20 h-10 transition-all duration-300 bg-gray-50 p-2'> Aurora's Jacket </p>
        </div>
        <div className='bg-gray-50 p-2 pb-0 space-y-2 relative group'>
          <img src={img2} alt='' className='w-full h-80 object-top object-cover' />
          <p className='absolute left-0 bottom-0 w-full group-hover:h-20 h-10 transition-all duration-300 bg-gray-50 p-2'> Harley's Tneads </p>
        </div>
        <div className='bg-gray-50 p-2 pb-0 space-y-2 relative group'>
          <img src={img3} alt='' className='w-full h-80 object-top object-cover' />
          <p className='absolute left-0 bottom-0 w-full group-hover:h-20 h-10 transition-all duration-300 bg-gray-50 p-2'> Dave's Sweater </p>
        </div>
        <div className='bg-gray-50 p-2 pb-0 space-y-2 relative group'>
          <img src={img1} alt='' className='w-full h-80 object-top object-cover' />
          <p className='absolute left-0 bottom-0 w-full group-hover:h-20 h-10 transition-all duration-300 bg-gray-50 p-2'> Aurora's Jacket </p>
        </div>
        <div className='bg-gray-50 p-2 pb-0 space-y-2 relative group'>
          <img src={img2} alt='' className='w-full h-80 object-top object-cover' />
          <p className='absolute left-0 bottom-0 w-full group-hover:h-20 h-10 transition-all duration-300 bg-gray-50 p-2'> Harley's Tneads </p>
        </div>
        <div className='bg-gray-50 p-2 pb-0 space-y-2 relative group'>
          <img src={img3} alt='' className='w-full h-80 object-top object-cover' />
          <p className='absolute left-0 bottom-0 w-full group-hover:h-20 h-10 transition-all duration-300 bg-gray-50 p-2'> Dave's Sweater </p>
        </div>
        {/* <h2 ref={headerRef} className='font-bold text-2xl'> Store </h2> */}
        {/* <p ref={textRef}> This is just an example page </p> */}
      </div>
    </section>
  )
}

export default Shop;
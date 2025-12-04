import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { IoIosPlay } from "react-icons/io";
import aboutImg from "../assets/about-img-2.jpg";

const About = () => {

  const headerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Animate Header
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' }
    );
    // Animate First Text
    gsap.fromTo(
      textRef1.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.2 },
    );
    // Animate Second Text
    gsap.fromTo(
      textRef2.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.88, delay: 1.6 },
    );
    // Animate Image
    gsap.fromTo(
      imgRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.88, delay: 1.9 },
    );
  }, []);

  return (
    <div className="flex flex-col gap-1 items-center justify-center h-full py-4">
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
        <h2 ref={headerRef} className='col-span-1 text-base font-semibold'> History </h2>

        <div className='col-span-2' ref={textRef1}>
          <p className='text-start'> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, suscipit vel? Perspiciatis ipsum provident repellat amet dolorum commodi nam, animi cum odit exercitationem impedit voluptatum id, recusandae facilis esse.
          </p>
        </div>

        <small className='col-span-1 text-start md:text-end font-semibold' ref={textRef2}> EST. 2015 </small>
      </div>

      <div ref={imgRef} className='relative w-full h-100 mt-4 md:mt-8 mb-2 bg-red-500'>
        <span className='absolute top-2 md:top-4 left-2 md:left-4 bg-gray-50 p-2 text-gray-800 text-xs flex items-center gap-1 cursor-pointer'> 
          Play Video <IoIosPlay />
        </span>
        <img src={aboutImg} alt='' className='w-full h-full object-center object-cover bg-gray-400' />
      </div>

      <h1 className='text-center text-xl md:text-6xl font-semibold'> MECO CLUB - RECORD LABEL </h1>
    </div>
  )
}

export default About;
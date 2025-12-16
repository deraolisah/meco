import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { IoIosPlay } from "react-icons/io";
import aboutImg from "../assets/about-img-2.jpg";

const About = () => {

  const headerRef1 = useRef(null);
  const headerRef2 = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const imgRef = useRef(null);


  const borderRef = useRef(null);

  useEffect(() => {
    // Animate Header
    gsap.fromTo(
      headerRef1.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' }
    );
    // Animate First Text
    gsap.fromTo(
      textRef1.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.2 },
    );
    // Animate Image
    gsap.fromTo(
      imgRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.88, delay: 1.6 },
    );
    
    
    
    gsap.fromTo(
      borderRef.current,
      { width: '0%' },
      { width: '100%', duration: 1, delay: 1.9, ease: 'power2.out' }
    );
    
    gsap.fromTo(
      headerRef2.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 2.08, ease: 'power2.out' }
    );
    // Animate Second Text
    gsap.fromTo(
      textRef2.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.88, delay:  2.3 },
    );
    gsap.fromTo(
      textRef3.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.88, delay: 2.6 },
    );
  }, []);

  
  return (
    <div className="flex flex-col gap-1 items-center justify-center h-full py-4">
      <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 relative pb-4'>
        <h2 ref={headerRef1} className='col-span-1 text-start text-base font-semibold'> About </h2>

        <div className='col-span-3' ref={textRef1}>
          <p className='text-justify'> 
            Meco Club is a UK-based record label dedicated to discovering, developing, and elevating exceptional musical talent. We are more than a label, we are a creative home where artists are empowered to grow, experiment, and build lasting careers in music.
          </p>
        </div>
        <div ref={borderRef} className="w-full absolute bottom-0 left-0 h-[1px] bg-gray-300"></div>
      </div>




      <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-2 py-4'>
        <h2 ref={headerRef2} className='col-span-1 text-start text-base font-semibold'> History </h2>

        <div className='col-span-2' ref={textRef2}>
          <p className='text-start'> 
           Founded with a passion for originality and cultural impact, Meco Club works closely with a diverse roster of artists across multiple genres, providing the structure, support, and creative freedom needed to thrive in today’s evolving music industry.
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, suscipit vel? Perspiciatis ipsum provident repellat amet dolorum commodi nam, animi cum odit exercitationem impedit voluptatum id, recusandae facilis esse. */}
          </p>
        </div>

        <small className='col-span-1 text-start md:text-end font-semibold' ref={textRef3}> EST. 2015 </small>
      </div>


      <div ref={imgRef} className='relative w-full h-68 md:h-100 mt-4 mb-2 bg-red-500'>
        <span className='absolute top-2 md:top-4 left-2 md:left-4 bg-gray-50 p-2 text-gray-800 text-xs flex items-center gap-1 cursor-pointer'> 
          Play Video <IoIosPlay />
        </span>
        <img src={aboutImg} alt='' className='w-full h-full object-center object-cover bg-gray-400' />
      </div>

      <h1 className='text-center text-xl md:text-6xl font-semibold mb-2'> MECO CLUB - RECORD LABEL </h1>

      <small className='text-center'> 
        At Meco Club, we believe that great music deserves the right platform. From artist development and music production to branding, distribution, and promotion, we take a hands-on approach to ensure every artist’s vision is protected and amplified. 
        
        {/* <br/> */}
        Our team collaborates strategically with artists to help them connect with global audiences while staying true to their sound and identity. 
      </small>

    </div>
  )
}

export default About;
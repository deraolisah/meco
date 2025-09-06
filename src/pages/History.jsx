import React, { useEffect, useRef } from 'react';
import gsap from "gsap";

const History = () => {

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
    <div className="flex flex-col gap-4 items-center justify-center h-full py-4">
      <h2 ref={headerRef} className='font-bold text-2xl'> History </h2>
      <p ref={textRef}> This is just an example page </p>
      <p> </p>
    </div>
  )
}

export default History;
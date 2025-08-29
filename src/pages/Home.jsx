import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { artists } from "../assets/data";


const Home = () => {
  const navigate = useNavigate();

  const gridRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleMouseMove = (e, index) => {
    const gridBounds = gridRef.current.getBoundingClientRect();
    const offsetX = e.clientX - gridBounds.left;
    const offsetY = e.clientY - gridBounds.top;

    const tooltipWidth = 160;
    const tooltipHeight = 80;

    let left = offsetX + 10;
    let top = offsetY + 10;

    // Prevent overflow right
    if (left + tooltipWidth > gridBounds.width) {
      left = gridBounds.width - tooltipWidth - 10;
    }

    // Prevent overflow bottom
    if (top + tooltipHeight > gridBounds.height) {
      top = gridBounds.height - tooltipHeight - 10;
    }

    setTooltipPos({ top, left });
    setHoveredIndex(index);
  };






  

  const handleClick = (artist) => {
    navigate(`/artist/${artist.id}`);
  };


  return (
    <main className='flex flex-col overflow-x-hidden'>
      <div className='flex items-end justify-between py-4.5 border-b border-gray-300'>
        <div className='flex flex-col md:flex-row items-start md:items-end gap-1 md:gap-6'>
          <h1 className='text-2xl md:text-5xl font-bold'> Artists </h1>

          <span className='text-base font-semibold space-x-4 md:mb-px'>
            <button className='cursor-pointer hover:underline'> Sort </button>
            <button className='cursor-pointer hover:underline'> Shuffle </button>
            <button className='cursor-pointer hover:underline'> Search </button>
          </span>
        </div>

        <p className='text-2xl font-extrabold'> ({artists.length}) </p>
      </div>

      <div ref={gridRef} className="relative grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-0 mt-4 mb-[5%]">
        {artists.map((artist, index) => (
          <div
            onClick={() => handleClick(artist)}
            key={index}
            className="w-full bg-gradient-to-bl from-blue-200 via-pink-600 to-green-900 transition-transform duration-300 cursor-pointer overflow-hidden"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className='aspect-[4/5]'>
              <img src={artist.image} alt={artist.tag} className="w-full h-full transition-all duration-200 object-cover object-top" loading='lazy' />
            </div>
          </div>
        ))}

        {/* Tooltip rendered once, outside the cards */}
        {hoveredIndex !== null && (
          <div
            key={hoveredIndex}
            className="w-fit absolute bg-black/85 backdrop-blur-xs shadow-lg text-white p-3 pointer-events-none z-10 transition-all duration-50 ease-in-out space-y-1"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
              // width: '160px',
            }}
          >
            <h2 className="text-xs font-bold uppercase overflow-hidden animate-slideDown">
              {artists[hoveredIndex].tag}
            </h2>
            <div className="flex items-center justify-between gap-6 overflow-hidden">
              <p className="text-xs text-gray-300 animate-slideUp">{artists[hoveredIndex].name}</p>
              <p className="text-xs text-gray-300 animate-slideUp">{artists[hoveredIndex].genre}</p>
            </div>
          </div>
        )}
      </div>

    </main>
  )
}

export default Home;
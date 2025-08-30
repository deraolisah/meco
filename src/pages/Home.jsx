import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { artists } from "../assets/data";
import gsap from "gsap";
import { useLayoutEffect } from "react";


const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'
  const [shuffled, setShuffled] = useState(false);
  const [shuffledArtists, setShuffledArtists] = useState([]);

  const navigate = useNavigate();
  const gridRef = useRef(null);
  const hasAnimated = useRef(false);


  // SEARCH FILTER, SORTING AND SHUFFLE
  let filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder === 'asc') {
    filteredArtists.sort((a, b) => a.num - b.num);
  } else if (sortOrder === 'desc') {
    filteredArtists.sort((a, b) => b.num - a.num);
  }

  if (shuffled) {
    filteredArtists = shuffleArray(filteredArtists);
  }

  const displayedArtists = shuffled ? shuffledArtists : filteredArtists;


  // GSAP STAGGERED ANIMATION
  useLayoutEffect(() => {
    if (hasAnimated.current) return;

    const cards = gridRef.current.querySelectorAll(".artist-card");

    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.88,
      ease: "power3.out",
      stagger: 0.15,
      // clearProps: "opacity-0", // removes inline styles after animation
    });

    hasAnimated.current = true;
  }, []);


  // MOUSE-HOVER TOOLTIP EFFECT
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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


  // SEARCH KEY
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 's') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <main className='flex flex-col overflow-x-hidden'>
      <div className='flex items-end justify-between py-4.5 border-b border-gray-300'>
        <div className='flex flex-col md:flex-row items-start md:items-end gap-1 md:gap-6'>
          <h1 className='text-2xl md:text-5xl font-bold'> Artists </h1>
          <span className='text-base font-semibold space-x-4 md:mb-px'>
            {/* <button className='cursor-pointer hover:underline' onClick={() => {
              setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
              setShuffled(false);}}>
              Sort {sortOrder === 'asc' ? '↓' : sortOrder === 'desc' ? '↑' : ''}
              </button> */}
            <button className='cursor-pointer hover:underline' onClick={() => {
              setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
              setShuffled(false);}}>
              Sort {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : ''}
            </button>

            <button className='cursor-pointer hover:underline' onClick={() => {
              const shuffledList = shuffleArray(filteredArtists);
              setShuffledArtists(shuffledList);
              setShuffled(true);
              setSortOrder(null);}}>
              Shuffle
            </button>
            <button className='cursor-pointer hover:underline' onClick={() => setShowSearch(true)}> Search </button>
          </span>
        </div>
        <p className='text-2xl font-extrabold'> ({artists.length}) </p>
      </div>

      {/* SEARCH */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black p-8 shadow-lg w-[90%] max-w-md relative">
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-2 right-4 font-normal text-white cursor-pointer text-2xl"
            >
              {/* &times; */}
              ×
            </button>
            {/* <h2 className="text-xl text-white font-bold mb-4">Search</h2> */}
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={(e) => {setSearchTerm(e.target.value);setShuffled(false);}}
              className="w-full py-1 border-b mt-4 text-2xl font-extrabold text-white border-gray-300 focus:outline-none placeholder-gray-600"
            />
            <span className='text-sm text-gray-300'> Enter a name or stage name </span>
          </div>
        </div>
      )}

      {/* GRID LAYOUT */}
      <div ref={gridRef} className="relative grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-0 my-4 h-fit -space-px overflow-hidden">
        {/* {artists.map((artist, index) => ( */}
        {/* {filteredArtists.map((artist, index) => ( */}
        {/* {(shuffled ? shuffledArtists : filteredArtists).map((artist, index) => ( */}
        {displayedArtists.map((artist, index) => (
          <div
            onClick={() => handleClick(artist)}
            key={index}
            className="artist-card will-change-transform opacity-0 translate-y-4 w-full bg-gradient-to-bl from-blue-200 via-pink-600 to-green-900 transition-transform duration-300 cursor-pointer overflow-hidden"
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
              {/* {artists[hoveredIndex].tag} */}
              {displayedArtists[hoveredIndex].tag}
            </h2>
            <div className="flex items-center justify-between gap-6 overflow-hidden">
              {/* <p className="text-xs text-gray-300 animate-slideUp">{artists[hoveredIndex].name}</p>
              <p className="text-xs text-gray-300 animate-slideUp">{artists[hoveredIndex].genre}</p> */}
              <p className="text-xs text-gray-300 animate-slideUp">{displayedArtists[hoveredIndex].name}</p>
              <p className="text-xs text-gray-300 animate-slideUp">{displayedArtists[hoveredIndex].genre}</p>
            </div>
          </div>
        )}
      </div>

    </main>
  )
}

export default Home;
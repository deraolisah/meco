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
  const headerRef = useRef(null);
  const buttonRefs = useRef([]);
  buttonRefs.current = [];
  const borderRef = useRef(null);
  const countRef = useRef(null);
  const [artistCount, setArtistCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    if (artists.length > 0) {
      setArtistCount(artists.length);
    }
  }, [artists]);


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


  // GSAP CARDS STAGGERED ANIMATION      
  const animateCards = (gridRef) => {
    const cards = gridRef.current?.querySelectorAll(".artist-card");
    if (!cards || cards.length === 0) return;
    
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      delay: 1.3,
      duration: 0.88,
      ease: "power3.out",
      stagger: 0.15,
      // clearProps: "opacity-0", // removes inline styles after animation
    });
  }; 
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      animateCards(gridRef);
    }, 50); // slight delay to ensure DOM is ready

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      animateCards(gridRef);
    }, 50); // wait for DOM to update

    return () => clearTimeout(timeout);
  }, [displayedArtists]);



  // GSAP SLIDE-IN ANIMATIONS
  useEffect(() => {
    // Animate Header
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' }
    );
    // Animate Buttons
    gsap.fromTo(
      buttonRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        delay: 0.88,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15
      }
    );
    // Animate Border
    gsap.fromTo(
      borderRef.current,
      { width: '0%' },
      { width: '100%', duration: 1, delay: 0.9, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    if (artistCount > 0) {
      gsap.fromTo(
        countRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1, ease: 'power2.out' }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: artistCount,
        duration: 1.4,
        delay: 1.6, // starts after fade-in
        ease: 'power2.out',
        onUpdate: () => {
          setAnimatedCount(Math.floor(obj.val));
        }
      });
    }
  }, [artistCount]);




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



  // Navigate to Artist Details Page
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
      <div className='flex items-end justify-between py-4.5 relative'>
        <div className='flex flex-col md:flex-row items-start md:items-end gap-1 md:gap-6'>
          <h1 ref={headerRef} className='text-2xl md:text-5xl font-bold'> Artists </h1>
          <span className='text-base font-semibold space-x-4 md:mb-px'>
            {["Sort", "Shuffle", "Search"].map((label, index) => (
              <button
                key={label}
                ref={el => buttonRefs.current[index] = el}
                className='cursor-pointer hover:underline'
                onClick={() => {
                  if (label === "Sort") {
                    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
                    setShuffled(false);
                  } else if (label === "Shuffle") {
                    const shuffledList = shuffleArray(filteredArtists);
                    setShuffledArtists(shuffledList);
                    setShuffled(true);
                    setSortOrder(null);
                  } else {
                    setShowSearch(true);
                  }
                }}
              >
                {label}
              </button>
            ))}
          </span>

          {/* <span className='text-base font-semibold space-x-4 md:mb-px'>
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
          </span> */}
        </div>
        <p ref={countRef} className='text-2xl font-extrabold'> ({animatedCount}) </p>
        <div ref={borderRef} className="absolute bottom-0 left-0 h-[1px] bg-gray-300"></div>
      </div>

      {/* SEARCH */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black p-8 shadow-lg w-[90%] max-w-md relative">
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-2 right-4 font-normal text-white cursor-pointer text-2xl"
            >
              ×
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setShuffled(false);}}
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
            className="artist-card will-change-transform opacity-0 translate-y-8 w-full bg-gradient-to-bl from-blue-200 via-pink-600 to-green-900 transition-transform duration-300 cursor-pointer overflow-hidden"
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
            className="w-fit absolute bg-black/85 backdrop-blur-xs shadow-lg text-white p-3 pointer-events-none z-10 transition-all duration-0 ease-in-out space-y-1"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
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
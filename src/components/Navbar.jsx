import React, { useState } from 'react';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className='w-full pb-4 flex flex-wrap items-center justify-between border-b border-gray-300'>
      <a href='/' className='text-lg font-bold'> Meco Club </a>

      <div className='flex md:hidden cursor-pointer' onClick={toggleMenu} title='menu'>
        {!menuOpen ? (
          <div className='flex flex-col gap-1'>
            <span className='h-0.5 w-6 bg-black rounded-full'></span>
            <span className='h-0.5 w-6 bg-black rounded-full'></span>
          </div>
        ) : (
          <div className='text-5xl w-4 h-4 flex items-center justify-center font-normal'>
            ×
          </div>
        )}
      </div>


      <ul className={`md:max-h-fit flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-6 font-semibold w-full md:w-fit overflow-hidden transition-all duration-200 ${menuOpen ? "max-h-auto" : "max-h-0"}`}>
        <a href="/releases" className='w-full md:w-fit text-end hover:text-gray-400 mt-4 md:mt-0'> Releases </a>
        <a href="/history" className='w-full md:w-fit text-end hover:text-gray-400'> History </a>
        <a href="/store" className='w-full md:w-fit text-end hover:text-gray-400'> Store </a>
        <a href='/contact' className='w-full md:w-fit text-end hover:text-gray-400'> Contact </a>
      </ul>
    </nav>
  )
}

export default Navbar;
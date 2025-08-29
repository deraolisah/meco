import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full border-t border-gray-400 mt-20 pt-8 pb-6 text-center text-gray-800 font-medium'>
      <p> 
        Based on the design by Alex Tkachev.&nbsp;
        
        <span>
          Inspired by&nbsp;
          <a href='https://codrops.com' target='_blank' className='text-black font-bold hover:underline'>Codrops</a> 
          &nbsp;using Astro 5.2.&nbsp;
        </span>
 
      </p>

      <br/>
      <span>
        Coded in Reactjs 9.1.3 by&nbsp;
        <a href="https://deraolisah.com" target='_blank' className='text-black font-bold hover:underline'>Nathan</a>.
      </span>

      <br/>
      <span> Browse <a href="https://github.com/deraolisah/meco" target='_blank'>The GitHub Repo.</a></span>
    </footer>
  )
}

export default Footer;
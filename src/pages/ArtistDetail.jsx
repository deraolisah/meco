import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { artists } from "../assets/data";

const ArtistDetail = () => {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id); // Replace with actual data source

  const currentNum = artist.num;
  // const nextArtist = artists.find((a) => a.num === currentNum + 1);
  const nextArtist = artists.find((a) => a.num === currentNum + 1) || artists[0];


  if (!artist) return <p>Artist not found</p>;

  return (
    <div className="">
      <div className='flex flex-col items-start gap-1 justify-between py-4 border-b border-gray-400'>
        <h1 className='text-2xl md:text-4xl font-bold'> 
          {artist.tag} <span className='text-gray-300'> ({artist.name}) </span> 
        </h1>
        <span className='text-sm font-semibold space-x-1'>
          <Link to="/" className='hover:text-gray-400'> View All </Link> 
          / 
          {nextArtist ? (
            <Link to={`/artist/${nextArtist.id}`} className='hover:text-gray-400'>
              &nbsp; Next Artist
            </Link>
          ) : (
            <span className='text-gray-500'> End of List </span>
          )}
        </span>
      </div>

      <div className='w-full grid grid-cols-1 md:grid-cols-3 items-start py-4 gap-8'>
        <img src={artist.image} alt={artist.tag} className='w-full md:h-auto object-bottom object-cover bg-red-500' /> 
        <div className='col-span-2'>
          <h5 className='text-lg font-semibold mb-4'> Biography </h5>
          {/* <p> {artist.bio} </p> */}
          <p className="whitespace-pre-line text-base">
            {artist.bio}
          </p>
          <br/>          
          <h5 className='text-lg font-semibold'> Genre: <span className='font-normal text-base'> {artist.genre} </span> </h5>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;
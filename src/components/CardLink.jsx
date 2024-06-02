import React from 'react'

export default function CardLink({imgSrc, name, title, description}) {
  return (
    <div>   <div className="hero-section px-4 sm:px-8 md:px-16 lg:px-20">
    <h2 className="text-xl text-gray-900 mt-40">Just in</h2>
    <img
      className="max-w-screen mt-6"
      src={imgSrc}
      alt=""
    />
    <div
      className="items-center mx-auto sm:mx-10 md:mx-20 p-2 text-center sm:p-4 md:p-8 lg:p-12 mt-4 dark:text-textDark"
      aria-label="Global"
    >
      <h1 className='py-4 text-xl font-medium'>{name}</h1>
      <p className="text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-nike">
        {/* CHECK THE<br></br> FOOTWORK IN <br></br>THE ZOOM FREAK 5<br></br>{" "}
        &apos;MADE IN SEPOLIA&apos; */}
        {title}
      </p>
      <p className="mt-4 lg:text-2xl">
        {/* Lively street art and global football roots inspire Giannis’ latest
        colourway. */}
        {description}
      </p>  
      <button className="bg-black dark:bg-slate-100 dark:text-bgDark text-white rounded-2xl px-4 py-1 mt-4">
        Shop
      </button>
    </div>
  </div></div>
  )
}

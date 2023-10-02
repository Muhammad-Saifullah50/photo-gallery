"use client"
import Image from 'next/image'
import React, { useState } from 'react'

type ImageCardProps = {
  src: string
  width: number
  height: number
  alt: string
}


const ImageCard = ({ src, width, height, alt }: ImageCardProps) => {

  const [liked, setLiked] = useState(false)
  const handleClick = async () => {
    const response = await fetch('/api/favourites',
      {
        method: 'POST',
        body: JSON.stringify(src)
      }
    )
    console.log(response)
  }
  return (
    <div key={src} className={`break-inside-avoid group relative`}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className='rounded-lg object-contain'
      />
      <div className='overlay bg-black bg-opacity-50 hidden group-hover:flex absolute left-0 top-0 w-full h-full rounded-lg '>
        <div className='group/heart'>
          <Image
            src={`${liked ? '/heart-red.png' : '/heart.svg'}`}
            width={25}
            height={25}
            alt='heart'
            className={`${!liked ? 'invert' : ''} absolute right-3 top-3`}
            onClick={() => {
              setLiked((prev) => !prev);
              handleClick()
            }}
          />
          <div className='hidden group-hover/heart:block bg-gray-800 text-xs text-white p-1 absolute top-10 -right-6 z-30 rounded-sm'>
            {liked ? 'Added to Favourites' : "Add to Favourites"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCard

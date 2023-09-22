import Image from 'next/image'
import React from 'react'

type ImageCardProps = {
  src: string
  width: number
  height: number
  alt: string
}


const ImageCard = ({ src, width, height, alt }: ImageCardProps) => {


  return (
    <div key={src} className={`break-inside-avoid`}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className='rounded-lg object-contain'
       
      />
    </div>
  )
}

export default ImageCard

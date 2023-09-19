import Image from 'next/image'
import React from 'react'

type ImageCardProps = {
  key: string
  src: string
  width: number
  height: number
  alt: string
}
const ImageCard = ({ key, src, width, height, alt }: ImageCardProps) => {
  return (
    <div key={key} className={`break-inside-avoid`}>
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

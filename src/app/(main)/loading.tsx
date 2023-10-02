"use client"
import { useTheme } from 'next-themes'
import { TailSpin } from 'react-loader-spinner'

const Loading = () => {
  const { theme } = useTheme()
  return (

    <div className="w-full h-full flex justify-center items-center">
      <TailSpin
        height="80"
        width="80"
        color={`${theme === 'dark' ? '#FFFFFF' : '#000000'}`}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        
      />
    </div>

  )
}
export default Loading

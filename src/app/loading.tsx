"use client"
import { Sidebar } from '@/components'
import { useTheme } from 'next-themes'
import { TailSpin } from 'react-loader-spinner'

const loading = () => {
  const { theme } = useTheme()
  return (
    <section className="flex justify-between min-h-[81vh]">
      {/* <Sidebar /> */}
      <section className="flex flex-col w-[80%] px-8 relative left-[20%] z-0">
        <div className="flex justify-center items-center">
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
      </section>
    </section>
  )
}
export default loading

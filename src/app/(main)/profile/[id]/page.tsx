import { getCurrentUser } from '@/lib/session'
import Image from 'next/image'
import React from 'react'

const Profile = async () => {

  const session = await getCurrentUser()
  return (<>
    <div className="flex pl-3 pt-9 justify-between items-center">
      <h1 className="font-bold text-2xl ">{session?.user?.name} Profile</h1>
    </div>
    <section className='flex flex-col justify-start pt-20 gap-10 items-center h-full'>
      <Image
        //@ts-ignore
        src={session?.user?.image}
        width={100}
        height={100}
        alt='profile image'
        className='object-contain rounded-full'
      />
      <p className='text-xl font-bold'> {session?.user?.name}</p>
      <p className='text-lg font-semibold'>Reach out at {session?.user?.email}</p>
    </section>
  </>)
}

export default Profile

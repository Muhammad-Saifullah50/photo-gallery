import { getCurrentUser } from '@/lib/session'
import React from 'react'

const Profile = async () => {

    const session = await getCurrentUser()
    // console.log(session)
  return (
    <section>{session?.user?.name}Profile</section>
  )
}

export default Profile

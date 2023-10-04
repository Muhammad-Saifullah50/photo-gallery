import { AuthProviders } from '@/components'
import React from 'react'

const SignIn = () => {
    return (
        <section className='h-[80vh] flex flex-col justify-center items-center space-y-10'>
            <h1 className="font-bold text-2xl ">Sign In to continue to Photoose</h1>

            <div className='flex flex-col justify-center items-center space-y-5 w-full'>
                <h2 className='font-semibold text-xl'>Sign In with Google</h2>
                <AuthProviders />
            </div>
        </section>
    )
}

export default SignIn
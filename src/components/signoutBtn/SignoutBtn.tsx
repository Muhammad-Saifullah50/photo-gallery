
"use client"
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const SignoutBtn = () => {
    
    return (
        <Button
        onClick={() => signOut()}
        >Sign Out</Button>
    )
}

export default SignoutBtn
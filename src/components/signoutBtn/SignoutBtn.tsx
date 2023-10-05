"use client"
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const SignoutBtn = () => {
    const handleClick = () => {
        signOut();
        document.cookie = 'hasBeenRedirected=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    }
    return (
        <Button
            onClick={handleClick}
        >Sign Out</Button>
    )
}

export default SignoutBtn
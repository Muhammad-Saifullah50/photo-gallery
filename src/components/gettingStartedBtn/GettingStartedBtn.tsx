"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

const GettingStartedBtn = () => {
    const pathName = usePathname();

    return (
        pathName === '/' || '' ? (<Link href='/gallery'>
            <Button
            >Get Started</Button></Link>) : null
    )
}

export default GettingStartedBtn
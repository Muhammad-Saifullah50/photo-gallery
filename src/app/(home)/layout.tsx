import React from 'react'
import { Footer, Navbar } from '@/components'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            {children}
            <Footer/>

        </main>

    )
}

export default layout

"use client"
import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string | null>
}

type Providers = Record<string, Provider>

const AuthProviders = ({ classname }: { classname?: string }) => {
    const [AuthProviders, setAuthProviders] = useState<Providers | null>(null)
    const pathname = usePathname()
    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setAuthProviders(response)
            // console.log(response)
        }
        fetchProviders();
    }, [])


    if (AuthProviders) {
        return (
            <div>
                {Object.values(AuthProviders)?.map((provider: Provider, i) => (
                    <Button
                        key={i}
                        className={`${classname}`}
                        onClick={() => signIn(provider?.id)}

                    >Sign In</Button>
                ))}
            </div>
        )
    }
}

export default AuthProviders

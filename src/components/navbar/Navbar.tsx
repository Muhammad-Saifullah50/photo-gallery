
import Image from 'next/image'
import { getCurrentUser } from '@/lib/session'
import { AuthProviders, GettingStartedBtn, SignoutBtn } from '..'
import { ModeToggle } from '../theme/ThemeSwitcher'
import Link from 'next/link'
import { Button } from '../ui/button'
const Navbar = async () => {

    const session = await getCurrentUser();
    // console.log(session)
    const userId = (session?.user as { id: string })?.id || null
    return (
        <header className='flex justify-between items-center px-5 md:px-10 py-2 border-gray-600 border-b-2 sticky top-0 left-0 z-20 bg-white dark:bg-zinc-950' >
            <div className="logo flex gap-3 justify-start items-center">
                <Image
                    src='/logo.png'
                    width={40}
                    height={40}
                    alt='logo'
                    className='dark:invert'
                />
                <h1 className='text-lg font-semibold dark:text-white'>Photooose</h1>
            </div>

            <div className="profile flex justify-between items-center gap-5">
                <ModeToggle />
                <div className="profileinfo flex justify-between items-center gap-3">

                    {session?.user ?
                        (<>
                            <p className='hidden sm:block text-gray-800 dark:text-white font-medium'>{session?.user.name}</p>
                            <Link href={`/profile/${userId}`} className='hidden sm:block'>
                                <Image
                                    //@ts-ignore
                                    src={session?.user.image}
                                    width={35}
                                    height={35}
                                    alt='profile'
                                    className='rounded-full object-contain'
                                />
                            </Link>
                            <SignoutBtn />
                            <GettingStartedBtn />
                        </>)
                        : <> <AuthProviders />
                            <GettingStartedBtn />
                        </>}

                </div>
            </div>
        </header >
    )
}

export default Navbar
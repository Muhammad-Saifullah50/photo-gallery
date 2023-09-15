import Link from 'next/link'
import { GrGallery } from 'react-icons/gr'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoAlbums } from 'react-icons/io5'
import { SiNginxproxymanager } from 'react-icons/si'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/session'


const Sidebar = async () => {
  const session = await getCurrentUser();

  const userId = (session?.user as { id: string })?.id || null

  return (<>
    {/* // Desktop Navigation */}
    <section className='hidden sm:block sm:w-[20%] sm:fixed '>
      <nav className='flex flex-col gap-5 border-r-2 border-gray-600 h-[90vh] pt-8 pl-3 md:pl-5'>
        <h3 className='font-bold text-2xl pl-3 '>Manage</h3>
        <Link className='hover:bg-gray-200 dark:hover:bg-opacity-20 w-2/3 px-3 py-2 rounded-r-full' href='/'>Gallery</Link>
        <Link className='hover:bg-gray-200 dark:hover:bg-opacity-20 w-2/3 px-3 py-2 rounded-r-full' href='/'>Favorites</Link>
        <Link className='hover:bg-gray-200 dark:hover:bg-opacity-20 w-2/3 px-3 py-2 rounded-r-full' href='/'>Albums</Link>
      </nav>
    </section>

    {/* Mobile Navigation */}
    <section className='sm:hidden w-[20%] fixed '>
      <nav className='flex flex-col gap-7 items-center border-r-2 border-gray-600 h-[90vh] pt-10 '>
        <div><h3 className='py-2'><SiNginxproxymanager size='35' /></h3></div>
        <div><Link className='w-full px-3 py-2  invert' href='/'><GrGallery size='33' /> </Link></div>
        <div><Link className='w-full px-3 py-2 ' href='/'><AiOutlineHeart size='38' /></Link></div>
        <div><Link className='w-full px-3 py-2 ' href='/'><IoAlbums size='35' /></Link></div>
        <Link href={`/profile/${userId}`} className='py-2'>
          <Image
            //@ts-ignore
            src={session?.user.image}
            width={40}
            height={40}
            alt='profile'
            className='rounded-full object-contain'
          />
        </Link>
      </nav>
    </section>
  </>)
}

export default Sidebar
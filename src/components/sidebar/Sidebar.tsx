import Link from 'next/link'
import { GrGallery } from 'react-icons/gr'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoAlbums } from 'react-icons/io5'
import { SiNginxproxymanager } from 'react-icons/si'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/session'
import { AiOutlineUpload } from 'react-icons/ai'


const Sidebar = async () => {
  const session = await getCurrentUser();

  const userId = (session?.user as { id: string })?.id || null

  return (<>
    {/* // Desktop Navigation */}
    <section className='hidden sm:flex sm:flex-col sm:w-[20%] sm:fixed '>
      <nav className='flex flex-col gap-5 border-r-2 border-gray-600 h-[90vh] pt-8 pl-3 md:pl-5'>
        <h3 className='font-bold text-2xl pl-3 '>Manage</h3>

        <Link className='hover:bg-gray-200 dark:hover:bg-opacity-20 w-full px-3 py-2 rounded-r-full flex gap-5' href='/gallery'>
          <span className='hidden md:block dark:invert'>
            <GrGallery size='23' />
          </span>
          Gallery
        </Link>

        <Link className='hover:bg-gray-200 dark:hover:bg-opacity-20 w-full px-3 py-2 rounded-r-full flex gap-5' href={`/favorites/${userId}`}>
          <span className='hidden md:block'>
            <AiOutlineHeart size='25' />
          </span>
          Favorites
        </Link>

        <Link className='hover:bg-gray-200 dark:hover:bg-opacity-20 w-full px-3 py-2 rounded-r-full flex gap-5' href={`/albums/${userId}`}>
          <span className='hidden md:block'>
            <IoAlbums size='25' />
          </span>
          Albums
        </Link>

        <Link className='hover:bg-gray-200 dark:hover:bg-opacity-20 w-full px-3 py-2 rounded-r-full flex gap-5' href={`/uploads/${userId}`}>
          <span className='hidden md:block'>
            <AiOutlineUpload size='25' />
          </span>
          My Uploads
        </Link>
      </nav>
    </section>

    {/* Mobile Navigation */}
    <section className='sm:hidden flex flex-col w-[20%] fixed '>
      <nav className='flex flex-col gap-7 items-center border-r-2 border-gray-600 h-[90vh] pt-10 '>
        <div>
          <h3 className='py-2'>
            <SiNginxproxymanager size='35' />
          </h3>
        </div>

        <div>
          <Link className='w-full px-3 py-2  dark:invert' href='/gallery'>
            <GrGallery size='33' />
          </Link>
        </div>

        <div>
          <Link className='w-full px-3 py-2 'href={`/favorites/${userId}`}>
            <AiOutlineHeart size='38' />
          </Link>
        </div>

        <div>
          <Link className='w-full px-3 py-2 ' href={`/albums/${userId}`}>
            <IoAlbums size='35' />
          </Link>
        </div>

        <div>
          <Link className='w-full px-3 py-2 ' href={`/uploads/${userId}`}>
            <AiOutlineUpload size='35' />
          </Link>
        </div>

        <Link href={`/profile/${userId}`} className='py-2'>
          {session &&
            <Image
              //@ts-ignore
              src={session?.user.image}
              width={40}
              height={40}
              alt='profile'
              className='rounded-full object-contain'
            />}
        </Link>
      </nav>
    </section>
  </>)
}

export default Sidebar

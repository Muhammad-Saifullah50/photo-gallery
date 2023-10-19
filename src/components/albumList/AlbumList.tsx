"use client"
import { Album } from '@/app/(main)/albums/[id]/page';
import Image from 'next/image';
import Link from 'next/link';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import getUserModel from '@/models/user';
type Props = {
    sessionUser: string, // as it is parsed into json string
    userId: string | null
}
const AlbumList = ({ sessionUser, userId }: Props) => {
    const parsedSessionUser = JSON.parse(sessionUser)
    const albums = parsedSessionUser?.albums

    const deleteAlbum = async (id: string) => {
        const user = JSON.parse(sessionUser)
        const albumtoDelete = user.albums.find((album: Album) => album._id === id)
        const idToDelete = albumtoDelete._id
    }

    return (<>
        <div className="albums flex flex-wrap gap-4 pt-5">
            {albums?.length !== 0
                ? (
                    albums?.map((album: Album, i: number) => (
                        <Link
                            href={`/albums/${userId}/album/${album._id}`}
                            key={i}>
                            <div className="flex flex-col justify-center items-center py-3 px-2  hover:bg-black dark:hover:bg-white hover:bg-opacity-5 dark:hover:bg-opacity-20 rounded-2xl">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild >
                                        <Button
                                            suppressHydrationWarning={true} variant="ghost"
                                            className='h-fit w-fit p-0.5 relative left-12 outline-none border-none focus:border-none hover:bg-white'
                                        >
                                            <BsThreeDotsVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => deleteAlbum(album._id)}>
                                            Delete Album
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Image
                                    src="/folder.png"
                                    height={200}
                                    width={100}
                                    alt="folder"
                                    className="ml-4" />
                                <p>{album.name}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full pt-40">
                        <p className="font-semibold text-lg">Sorry! No albums to show here</p>
                    </div>
                )}
        </div >

    </>);
}

export default AlbumList
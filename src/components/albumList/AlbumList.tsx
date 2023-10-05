"use client"
import { Album } from '@/app/(main)/albums/[id]/page';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    sessionUser: {
        _id: string,
        email:string,
        image:string,
        favourites: string[],
        albums: []
    },
    userId: string | null
}

const AlbumList = ({sessionUser, userId}: Props) => {
    return (<>
        <div className="albums flex flex-wrap gap-4 pt-5">
            {sessionUser && sessionUser.albums.length !== 0 ? (
                sessionUser.albums?.map((album: Album, i: number) => (
                    <Link href={`/albums/${userId}/album/${album._id}`} key={i}>
                        <div className="flex flex-col justify-center items-center py-3 px-2  hover:bg-black dark:hover:bg-white hover:bg-opacity-5 dark:hover:bg-opacity-20 rounded-2xl">
                            <Image src="/folder.png" height={200} width={100} alt="folder" className="ml-4" />
                            <p>{album.name}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="flex justify-center items-center w-full pt-40">
                    <p className="font-semibold text-lg">Sorry! No albums to show here</p>
                </div>
            )}
        </div>

    </>);
}

export default AlbumList
import { NewAlbum, Sidebar } from "@/components";
import { getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";
import Image from "next/image";
import Link from "next/link";


export type Album = {
  _id: string
  name: string;
  images: [];
};
const AlbumsPage = async () => {
  const session = await getCurrentUser();

  const getUser = async () => {
    const user = await getUserModel();
    return user;
  };
  const User = await getUser();

  const sessionUser = await User.findOne({
    email: session?.user?.email,
  });
  // console.log(sessionUser)
  const userId = (session?.user as { id: string })?.id || null
  return (<>

    <div className="flex pl-3 pt-9 justify-between items-center">
      <h1 className="font-bold text-2xl ">Your Albums</h1>
      <NewAlbum />
    </div>


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
};

export default AlbumsPage;

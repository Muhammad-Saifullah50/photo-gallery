
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
  return (
    <section className="flex justify-between min-h-[81vh]">
      <Sidebar />
      <section className="flex flex-col w-[80%] px-8 relative left-[20%] z-0">
        <div className="flex pl-3 pt-9 justify-between items-center">
          <h1 className="font-bold text-2xl ">Your Albums</h1>
          <NewAlbum />
        </div>


        <div className="albums flex flex-wrap gap-4 pt-5">
          {sessionUser && sessionUser.albums.length !== 0 ? (
            sessionUser.albums?.map((album: Album) => (
              <Link href={`/albums/${userId}/album/${album._id}`}>
              <div className="flex flex-col justify-center items-center py-3 px-2  hover:bg-black dark:hover:bg-white hover:bg-opacity-5 dark:hover:bg-opacity-20 rounded-2xl">
                <Image src="/folder.png" height={200} width={100} alt="folder" className="ml-4" />
                <p>{album.name}</p>
              </div>
              </Link>
            ))
          ) : (
            <p>Sorry! no albums to show here</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default AlbumsPage;

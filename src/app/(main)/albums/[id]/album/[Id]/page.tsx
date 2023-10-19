import { ImageCard, Sidebar } from "@/components";
import { getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";
import { Session } from "next-auth";
import { Album } from "../../page";

const AlbumDetails = async ({ params }: any) => {
  // console.log(params)
  const session: Session | null | undefined= await getCurrentUser();

  const getUser = async () => {
    const user = await getUserModel();
    return user;
  };
  const User = await getUser();

  const sessionUser = await User.findOne({
    email: session?.user?.email,
  });

  const currentAlbum = sessionUser?.albums.find((album: Album) => (
    album._id.toString() === params.Id
  ))
  // console.log(currentAlbum)
  return (<>

    <div className="flex pl-3 pt-9 justify-between items-center">
      <h1 className="font-bold text-2xl ">{currentAlbum?.name}</h1>
    </div>

    <div className={`${currentAlbum?.images.length > 0
      ? 'columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5'
      : 'flex justify-center items-center w-full h-full'}`}>
      {currentAlbum?.images.length > 0 ? currentAlbum?.images?.map((image: string, i: number) => (
        <ImageCard
          key={i}
          src={image}
          width={250}
          height={150}
          alt="image"
        />
      )) : (
        <p className="font-semibold text-lg">No images are uploaded in this folder yet</p>
      )}
    </div>

  </>)
}

export default AlbumDetails
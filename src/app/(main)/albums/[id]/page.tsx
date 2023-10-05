import { AlbumList, NewAlbum } from "@/components";
import { getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";

export type Album = {
  _id: string
  name: string;
  images: [];
};
const AlbumsPage = async () => {
  const session = await getCurrentUser();
  // console.log(session)

  const getUser = async () => {
    const user = await getUserModel();
    return user;
  };
  const User = await getUser();

  const sessionUser = await User.findOne({
    email: session?.user?.email,
  });
  // console.log(sessionUser._id.toString())
  const userId = sessionUser._id.toString()
  return (<>

    <div className="flex pl-3 pt-9 justify-between items-center">
      <h1 className="font-bold text-2xl ">Your Albums</h1>
      <NewAlbum />
    </div>

    <AlbumList 
    sessionUser={sessionUser}
    userId={userId}
    />


  </>);
};

export default AlbumsPage;

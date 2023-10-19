import { ImageCard } from "@/components";
import { getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";
import { Session } from "next-auth";

const Favorites = async () => {
  const session: Session | null | undefined = await getCurrentUser();
  // console.log(session)
  const getUser = async () => {
    const user = await getUserModel()
    return user
  }
  const User = await getUser();

  const sessionUser = await User.findOne({
    email: session?.user?.email,
  });
  // console.log(sessionUser)

  return (<>
    <h1 className="font-bold text-2xl pl-3 pt-9">Your Favourites</h1>
    <div className={`${sessionUser?.favourites.length !== 0 ? 'columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5' : 'flex justify-center items-center w-full h-full'}`}>
      {sessionUser && sessionUser?.favourites.length !== 0 ? (
        sessionUser.favourites?.map((imgPath: string, i: number) => (
          <ImageCard
            key={i}
            src={imgPath}
            width={269}
            height={180}
            alt="image"
          />
        ))
      ) : (
        <div>
          <p className="font-semibold text-lg">Sorry! You have not saved any images yet</p>
        </div>
      )}
    </div>

  </>)
}

export default Favorites
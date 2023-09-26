import { Album } from "@/app/albums/[id]/page";
import { ImageCard, Sidebar, Upload } from "@/components";
import { getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";
import { Session } from "next-auth";

const UploadPage = async () => {
    const session: Session | null = await getCurrentUser();

    const getUser = async () => {
        const user = await getUserModel();
        return user;
    };
    const User = await getUser();

    const sessionUser = await User.findOne({
        email: session?.user?.email,
    });
    // console.log(sessionUser);

    const getAlbums = () => {
        const albums = sessionUser?.albums.map((album: Album) => ({ name: album.name, id: album._id.toString() }))
        return albums;
    }
    const albumResult = await getAlbums();
    // console.log(albumResult);

    return (
        <section className="flex justify-between min-h-[81vh]">
            <Sidebar />
            <section className="flex flex-col w-[80%] px-8 relative left-[20%] z-0">
                <h1 className="font-bold text-2xl pl-3 pt-9">Your Uploaded Images</h1>
                <Upload albums={albumResult} />

                <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5">
                    {sessionUser && sessionUser.albums.length !== 0 ? (
                        sessionUser.albums.flatMap((album: Album) => album.images || []).map((imgPath: string, i: number) => (
                            <ImageCard
                                key={i}
                                src={imgPath}
                                width={269}
                                height={180}
                                alt="image"
                            />
                        ))
                    ) : (
                        <div className="flex justify-center items-center w-full pt-40">
                            <p className="font-semibold text-lg">Sorry! You have not uploaded any images yet</p>
                        </div>
                    )}
                </div>
            </section>
        </section>
    );
};

export default UploadPage;

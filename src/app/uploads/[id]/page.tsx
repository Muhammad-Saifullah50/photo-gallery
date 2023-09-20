import { ImageCard, Sidebar, Upload } from '@/components';
import { getCurrentUser } from '@/lib/session';
import getUserModel from '@/models/user';

const UploadPage = async () => {
    const session = await getCurrentUser();

    const getUser = async () => {
        const user = await getUserModel()
        return user
    }
    const User = await getUser();

    const sessionUser = await User.findOne({
        email: session?.user?.email,
    });

    return (
        <section className="flex justify-between min-h-[81vh]">
            <Sidebar />
            <section className="flex flex-col w-[80%] px-8 relative left-[20%] z-0">
                <h1 className="font-bold text-2xl pl-3 pt-9">Your Uploaded Images</h1>
                <Upload />


                <div className="images relative">
                    {sessionUser && sessionUser.uploadedImages.map((image: any, i: string) => (
                        <ImageCard 
                        key={i}
                        src={image}
                        width={100}
                        height={75}
                        alt='desc'
                        

                        />
                    ))}
                </div>
            </section>
        </section>)
}

export default UploadPage


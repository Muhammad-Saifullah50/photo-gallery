import { connectToDB } from "@/lib/database";
import { getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server"


export const GET = async () => {
    try {
        const session = await getCurrentUser()

        const getUser = async () => {
            const user = await getUserModel();
            return user;
        };
        const User = await getUser();

        const sessionUser = await User.findOne({
            email: session?.user?.email,
        });
        console.log(sessionUser, 'sessionuser');
        // const favourites = sessionUser?.favourites
        // console.log(favourites, 'favourites')
        return NextResponse.json({ message: 'Success' }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed' }, { status: 500 })
    }
}


export const POST = async (request: NextRequest) => {
    try {
        const session: Session | null = await getCurrentUser();
        const getUser = async () => {
            const user = await getUserModel()
            return user
        }
        const User = await getUser();

        const sessionUser = await User.findOne({
            email: session?.user?.email,
        });

        const data = await request.json();
        // console.log(data)

        sessionUser.favourites.push(data)
        await sessionUser.save();
        // console.log(sessionUser)


        return NextResponse.json({ message: "Image added to favourites successfully" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to upload image to favourites" }, { status: 500 })
    }


}
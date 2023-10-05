import { authOptions, getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";
import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
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
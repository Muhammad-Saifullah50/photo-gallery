import { getCurrentUser } from "@/lib/session";
import getUserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        const response = await request.json()
        if (response.albumname === '') {
            return NextResponse.json({ message: "Album name cannot be empty" }, { status: 400 })
        }
        const session = await getCurrentUser();

        const getUser = async () => {
            const user = await getUserModel()
            return user
        }
        const User = await getUser();
        const sessionUser = await User.findOne({
            email: session?.user?.email,
        })
        console.log(sessionUser)
        if (sessionUser) {
            const albumName = response.albumname.toString()
            const newAlbum = {name: albumName, images: []}
            sessionUser.albums.push(newAlbum)
            await sessionUser.save()
        }

        return NextResponse.json({ message: "Album added successfully" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: error }, { status: 400 })
    }

}
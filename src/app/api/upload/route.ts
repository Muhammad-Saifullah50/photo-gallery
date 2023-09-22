import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import getUserModel from "@/models/user";
import { getCurrentUser } from "@/lib/session";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
})

export const POST = async (request: NextRequest) => {

    const session = await getCurrentUser();

    const getUser = async () => {
        const user = await getUserModel()
        return user
    }
    const imageUrl = await request.text();
    // console.log(imageUrl)

    if (!imageUrl) {
        return NextResponse.json({ message: 'Image path is required' }, { status: 400 })
    }

    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [[{ width: 1000, height: 752, crop: "scale" }]]
        }

        const result = await cloudinary.uploader.upload(imageUrl, options)
        // console.log(result)

        const User = await getUser();

        const sessionUser = await User.findOne({
            email: session?.user?.email,
        });
        // if (sessionUser) {
        //     sessionUser.uploadedImages.push(result.secure_url)
        //     await sessionUser.save();
        // }
        return NextResponse.json({message: 'Image uploaded successfully'}, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to upload image " }, { status: 500 })
    }
}   

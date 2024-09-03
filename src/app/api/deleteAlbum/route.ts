import { connectToDB } from "@/lib/database";
import getUserModel from "@/models/user";
import { NextRequest } from "next/server";

export const DELETE = async (request: NextRequest) => {
    let { id } = await request.json()
    console.log(id)
    try {
        await connectToDB()

        const getUser = async () => {
            const user = await getUserModel();
            return user;
        };
        const User = await getUser();

        const updatedUser = await User.findOneAndDelete(id)
        console.log(await updatedUser)
    } catch (error) {
        console.error(error)
    }
}
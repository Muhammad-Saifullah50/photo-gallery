import { NextAuthOptions, getServerSession } from 'next-auth';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { getUserModel } from '@/models/user';
import { connectToDB } from './database';

const getUser = async () => {
    const user = await getUserModel()
    return user
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign(
                {
                    ...token,
                    iss: 'photoose',
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                },
                secret
            );
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
            return decodedToken;
        },
    },
    callbacks: {
        async session({ session }) {
            await connectToDB();
            const User = await getUser();
            const sessionUser = await User.findOne({
                email: session.user?.email,
            });

            if (sessionUser) {
                const updatedSession = {
                    ...session,
                    user: {
                        id: sessionUser._id.toString(),
                        name: sessionUser.name,
                        email: sessionUser.email,
                        image: sessionUser.image
                    }
                }
                return updatedSession
            }
            return session;
        },

        async signIn({ user }) {
            try {
                // console.log(user)
                await connectToDB();
                // checking if user already exists
                const User = await getUser();
                const userExists = await User.findOne({ email: user?.email });
                // if user does not exist, create a new one
                if (!userExists) {
                    await User.create({
                        email: user?.email,
                        name: user?.name?.replace(' ', "").toLowerCase(),
                        image: user?.image,
                    });
                }
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    },
};

export const getCurrentUser = async () => {
    await connectToDB();
    const session = await getServerSession(authOptions)
    return session
}
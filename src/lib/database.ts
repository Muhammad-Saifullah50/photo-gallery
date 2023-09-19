import mongoose, { ConnectOptions, models } from "mongoose";
let isConnected = false
export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('mongodb is connected') // is connected already
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'photoose',
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions)
        isConnected = true
        console.log('mongodb connected')
    } catch (error) {
        console.error(error)
    }
}

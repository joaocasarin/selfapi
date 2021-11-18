import mongoose from 'mongoose';

export const connectMongoDb = async () => {
    try {
        return await mongoose.connect(process.env.MONGODB_URL as string);
    } catch {
        return process.exit(1);
    }
};

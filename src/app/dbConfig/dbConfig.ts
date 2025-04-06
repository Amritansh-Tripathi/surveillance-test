import mongoose from 'mongoose';

let isConnected = false;

export async function connect() {
    if (!isConnected) {
        try {
            await mongoose.connect(process.env.MONGODB_URL || 'mongodb://192.168.128.113:27017/ARIS');
            isConnected = true;
            console.log('MongoDB connected');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }
}

export async function getDatabaseConnection() {
    if (!isConnected) {
        await connect();
    }
    return mongoose.connection;
}

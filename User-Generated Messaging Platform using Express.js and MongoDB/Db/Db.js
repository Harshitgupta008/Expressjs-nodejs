import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.MONGO_URL;

const data = async () => {
    try {
        await mongoose.connect(db);
        console.log("done mongo part")
    } catch (error) {
        console.log(`error in mongo part :: ${error}`)
    }
}

export { data };
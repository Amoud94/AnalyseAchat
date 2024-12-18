import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables
const MONGO_URI = process.env.NODE_ENV == "development" ? 'mongodb://localhost:27017' : process.env.DB_CONN_STRING
const DB_NAME = process.env.DB_NAME || 'worldofnumeric'

if (!MONGO_URI) {
  throw new Error('MongoDB connection string is not defined in .env');
}
if (!DB_NAME) {
  throw new Error('MongoDB DB_NAME string is not defined in .env');
}

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;

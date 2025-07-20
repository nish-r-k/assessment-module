
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {//MONGO_URI=mongodb atlas connection string
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ");
  } catch (error) {
    console.error("MongoDB connection failed ", error.message);
    process.exit(1);
  }
};
export default connectDB


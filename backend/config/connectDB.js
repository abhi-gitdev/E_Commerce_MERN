import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to DB: ${connect.connection.name}`);
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;

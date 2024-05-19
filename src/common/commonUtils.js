import { entry } from "./entry";
import mongoose from "mongoose";

export default class CommonUtil {
  static validateNum(num) {
    if (parseInt(num).toString() !== num.trim() || parseInt(num) <= 0) {
      return entry.ErrorMessage_InputNumber;
    }
    return "";
  }

  static connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
      throw new Error("Connection failed");
    }
  };
}

import { Entry } from "./entry";
import mongoose from "mongoose";

export default class CommonUtil {
  static validateNum(num) {
    if (parseInt(num).toString() !== num.trim() || parseInt(num) <= 0) {
      return Entry.ErrorMessage_InputNumber;
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

  static parsePrice(input) {
    // Convert the input number to a string
    let numberStr = input.toString();

    // Reverse the string for easier processing from right to left
    let reversedStr = numberStr.split("").reverse().join("");

    // Add commas after every three digits
    let formattedReversedStr = "";
    for (let i = 0; i < reversedStr.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedReversedStr += ",";
      }
      formattedReversedStr += reversedStr[i];
    }

    // Reverse the string back to the original order
    let formattedStr = formattedReversedStr.split("").reverse().join("");

    // Add '000d' at the end
    formattedStr += ",000₫";

    return formattedStr;
  }
}

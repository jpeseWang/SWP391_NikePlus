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
    let numberStr = input.toString();
    let reversedStr = numberStr.split("").reverse().join("");
    let formattedReversedStr = "";

    for (let i = 0; i < reversedStr.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedReversedStr += ",";
      }
      formattedReversedStr += reversedStr[i];
    }

    let formattedStr = formattedReversedStr.split("").reverse().join("");

    // Tìm vị trí của dấu chấm trong chuỗi
    let decimalIndex = formattedStr.indexOf('.');
    // Nếu có dấu chấm trong chuỗi
    if (decimalIndex !== -1) {
      // Thay thế dấu chấm bằng số 0
      formattedStr = formattedStr.replace('.', '0');
    }

    // Add '000d' at the end
    formattedStr += ",000₫";
    return formattedStr;
  }


  static getCountByData(data, attribute) {
    const typeCount = {};

    data?.forEach(item => {
      if (typeCount[item[attribute]]) {
        typeCount[item[attribute]]++;
      } else {
        typeCount[item[attribute]] = 1;
      }
    });
    // const result = Object.values(typeCount).map(count => count.toString());
    return Object.values(typeCount)
  }

  static getStorageValue(key, defaultValue) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      return initial;
    }
  }

  static setStorageValue(key, value) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

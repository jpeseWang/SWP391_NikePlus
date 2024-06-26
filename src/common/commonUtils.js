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

  static parseTimestamp(input) {
    const res = input.split("T")[0]
    return res;
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

  
  static getTimeDiff(time) {
    var units = [
      { name: 'second', limit: 60, in_seconds: 1 },
      { name: 'minute', limit: 3600, in_seconds: 60 },
      { name: 'hour', limit: 86400, in_seconds: 3600 },
      { name: 'day', limit: 604800, in_seconds: 86400 },
      { name: 'week', limit: 2629743, in_seconds: 604800 },
      { name: 'month', limit: 31556926, in_seconds: 2629743 },
      { name: 'year', limit: null, in_seconds: 31556926 },
    ]
  
    var diff = (new Date() - new Date(time)) / 1000
    if (diff < 5) return 'now'
  
    var i = 0
    let unit
    while ((unit = units[i++])) {
      if (diff < unit.limit || !unit.limit) {
        var diff = Math.floor(diff / unit.in_seconds)
        return diff + ' ' + unit.name + ' ago'
      }
    }
  }


}

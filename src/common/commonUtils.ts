import { entry } from "./entry";
export default class CommonUtil {
    public static validateNum(num: string): string {
        if (parseInt(num).toString() !== num.trim() || parseInt(num) <= 0) {
            return entry.ErrorMessage_InputNumber;
        }
        return "";
    }

}
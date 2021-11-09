const version: string = require("../package.json").version;
import { formatTime } from "../modules/formatTime"
import { regExpr } from "../modules/regExpr"
import { ArrayTool } from "../modules/arrayExtension"
import { deepClone } from "../modules/deepClone"
import { moneyToChinese } from "../modules/moneyToChinese"

export { version, formatTime, regExpr, ArrayTool, deepClone, moneyToChinese };

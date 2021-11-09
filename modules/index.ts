const version: string = require("../package.json").version;
import { formatTime } from "../modules/formatTime"
import { regExpr } from "../modules/regExpr"
import { ArrayTool } from "../modules/arrayExtension"
import { deepClone } from "../modules/deepClone"
import { moneyToChinese } from "../modules/moneyToChinese"
import { floatObj } from "../modules/floatObj"

export { version, formatTime, regExpr, ArrayTool, deepClone, moneyToChinese, floatObj };

import {formatTime} from "../modules/formatTime"

test("测试formatTime", () => {
    expect(formatTime).toBe("2001.11.02");
})
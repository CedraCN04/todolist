import { newId } from "../lib/functions"

describe("test newId function", () => {
    it("return 1 if array is empty", () => {
        expect(newId([])).toBe(1)
    })
    it("return 2 if array =[1]", () => {
        expect(newId([1])).toBe(2)
    })
    it("return 3 if array =[1, 2]", () => {
        expect(newId([1,2])).toBe(3)
    })
})
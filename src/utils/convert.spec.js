import { convert } from "./convert";

describe("Convert", () => {
    const rate = {
        convertTo: 'USD',
        data: { USDAUD: 0.8371 }
    };

    it("should convert from AUD to USD", () => {
        const convertFrom = convert({ amount: 1, state: rate, mode: "from" });
        expect(convertFrom).toBe(0.84);
    });

    it("should convert from USD to AUD", () => {
        const convertTo = convert({ amount: 1, state: rate, mode: "to" });
        expect(convertTo).toBe(1.19);
    });
});

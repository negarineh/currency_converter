import { crossViaCalculation, makeFromToList, rateCalculation } from "./rateCalculation";
import { CurrencyRates, RefCurrency } from "../consts/CurrencyRates";

const currencyPairs = {
    from: { from: "AUD", to: "USD", rate: 0.8371 },
    to: { from: "CAD", to: "USD", rate: 0.8711 }
};

describe("Rate Calculation", () => {

    describe("makeFromToList function", () => {
        it("should make a currency pair", () => {
            const convertFrom = makeFromToList(CurrencyRates, 'AUD', 'CAD');
            expect(convertFrom).toStrictEqual(currencyPairs);
        });
        it("currency pair is wrong", () => {
            const convertFrom = makeFromToList(CurrencyRates, 'AUD', 'CAD');
            expect(convertFrom).not.toStrictEqual({
                from: { from: "CAD", to: "USD", rate: 0.8711 },
                to: { from: "AUD", to: "USD", rate: 0.8371 }
            });
        });
    });

    describe("crossViaCalculation function", () => {
        it("should calculate conversion rate", () => {
            const convertFrom = crossViaCalculation(CurrencyRates, currencyPairs, RefCurrency);
            expect(convertFrom).toStrictEqual(0.96096888990931);
        });
        it("conversion wrong is wrong", () => {
            const convertFrom = crossViaCalculation(CurrencyRates, currencyPairs, RefCurrency);
            expect(convertFrom).not.toStrictEqual(0.11096888990931);
        });
    });

    describe("rateCalculation funcion", () => {
        it("should convert from AUD to USD", () => {
            const convertFrom = rateCalculation(CurrencyRates, 'AUD', 'CAD', RefCurrency);
            expect(convertFrom).toStrictEqual({ "AUDCAD": 0.96096888990931 });
        });
        it("incorrect return value from rateCalculation function", () => {
            const convertFrom = rateCalculation(CurrencyRates, 'AUD', 'CAD', RefCurrency);
            expect(convertFrom).not.toStrictEqual({ "AUDUSD": 0.96096888990931 });
        });
    });
});

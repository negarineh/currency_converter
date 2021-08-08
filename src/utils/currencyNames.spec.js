import { currencyName } from "./currencyName";
import { displayCurrency } from "./displayCurrency";

const currencyExchangeList = {
    EUR: {
        currencyName: "Euro",
        currencySymbol: "€",
        id: "EUR"
    },
    USD: {
        currencyName: "United States Dollar",
        currencySymbol: "$",
        id: "USD"
    }
};

describe("Display Currency", () => {
    const currencyList = Object.values(currencyExchangeList);

    it("should display the amount and the currency name in de_DE locale", () => {
        expect(displayCurrency({ currencyList, currencyId: "EUR", number: 10 })).toBe(`10 ${currencyList[0].currencyName}`);
    });

    it("display the incorrect amount and the currency name", () => {
        expect(displayCurrency({ currencyList, currencyId: "EUR", number: 10 })).not.toBe(`10 ${currencyList[1].currencyName}`);
    });

    it("should return the Currency Name United States Dollar", () => {
        expect(currencyName({ currencyList, currencyId: "USD" })).toEqual(currencyList[1].currencyName);
    });

    it("return incorrect Currency Name", () => {
        expect(currencyName({ currencyList, currencyId: "USD" })).not.toEqual(currencyList[0].currencyName);
    });

});

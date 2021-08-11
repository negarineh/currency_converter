import { currencyName } from "./currencyName";

export function displayCurrency({
    currencyList = [],
    currencyId = "AUD",
    number = 0
}) {
    const displayedCurrency = currencyName({ currencyList, currencyId });

    return `${number} ${displayedCurrency}`;
}

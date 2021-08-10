import { currencyName } from "./currencyName";

export function displayCurrency({
    currencyList = [],
    currencyId = "AUD",
    number = 0
}: {
    currencyList: any,
    currencyId: string | undefined,
    number: number
}) {
    const displayedCurrency = currencyName({ currencyList, currencyId });
    const formatting = new Intl.NumberFormat("de-DE").format(number);

    return `${formatting} ${displayedCurrency}`;
}

export function currencyName({ currencyList = [], currencyId = "AUD" }) {
    return currencyList.find(currency => currency.id === currencyId).currencyName;
}

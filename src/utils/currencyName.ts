export function currencyName({ currencyList = [], currencyId = "AUD" }: { currencyList: any, currencyId: string }) {
    return currencyList?.find((currency: any) => currency.id === currencyId).currencyName;
}

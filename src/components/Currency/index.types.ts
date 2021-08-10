export default interface CurrencyTypes {
    error: string,
    isFetched: boolean,
    from: number,
    to: number,
    convertFrom: string | undefined,
    convertTo: string | undefined,
    fromChangeInput: (value: string) => {},
    fromCurrencyChange: (value: string) => {},
    toChangeInput: (value: string) => {},
    toCurrencyChange: (value: string) => {},
    getRate: (convertFrom: string | undefined, convertTo: string | undefined) => {}
}

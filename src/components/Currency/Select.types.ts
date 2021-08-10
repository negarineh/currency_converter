export default interface SelectTypes {
    value: string | undefined,
    onChange: (e: any) => {},
    currencyList: [{
        currencyName: string
        currencySymbol: string
        id: string
    }] | Array<({
        currencyName: string
        currencySymbol: string
        id: string
    })>
}

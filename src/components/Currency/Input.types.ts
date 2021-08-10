export default interface InputTypes {
    currencyList: [{
        currencyName: string
        currencySymbol: string
        id: string
    }] | Array<({
        currencyName: string
        currencySymbol: string
        id: string
    })>,
    inputValue: string | number,
    selectValue: string | undefined,
    inputChange: (e: any) => {} | any,
    selectChange: (e: any) => {},
    inputRef?: React.RefObject<HTMLInputElement>,
}

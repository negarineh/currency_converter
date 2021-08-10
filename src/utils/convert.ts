import CurrenyPrecision from '../consts/CurrencyPrecision';

interface ConvertTypes {
    amount: number
    state: {
        data: Array<any>
        convertTo: string
    },
    mode: string
}

export function convert({ amount = 0, state = { data: [], convertTo: "USD" }, mode = 'from' }: ConvertTypes) {
    const rate = Object.values(state.data)[0];
    let result;

    /*    Direct   */
    if (mode === "from") {
        result = amount * rate;
    }
    if (mode === "to") {
        result = amount * (1 / rate);
    }

    return Number(result?.toFixed(CurrenyPrecision[state?.convertTo]));
}

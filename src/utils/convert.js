import CurrenyPrecision from '../consts/CurrencyPrecision';

export function convert({ amount = 0, state = {}, mode = 'from' }) {
    const rate = Object.values(state.data)[0];
    let result;

    /*    Direct   */
    if (mode === "from") {
        result = amount * rate;
    }
    if (mode === "to") {
        result = amount * (1 / rate);
    }

    return Number(result.toFixed(CurrenyPrecision[state.convertTo]));
}

/*  make a currency pair object
    {
        from: { from: "", to: "", rate: 0 },
        to: { from: "", to: "", rate: 0 }
    }
*/
export function makeFromToList(
    currencyRates: {
        currency: {
            from: string
            to: string
            rate: number
        }
    },
    fromCurrency: string,
    toCurrency: string
) {
    let currencyPair: any = {};

    currencyPair.from = Object.values(currencyRates).filter(item =>
        (item.from === fromCurrency && (item.to === "USD" || item.to === "EUR")) ||
        ((item.from === "USD" || item.from === "EUR") && item.to === fromCurrency)
    )[0];
    currencyPair.to = Object.values(currencyRates).filter(item =>
        (item.from === toCurrency && (item.to === "USD" || item.to === "EUR")) ||
        ((item.from === "USD" || item.from === "EUR") && item.to === toCurrency)
    )[0];

    return currencyPair;
}

export function crossViaCalculation(
    currencyRates: any,
    currencyPair: {
        from: {
            from: string
            to: string
            rate: number
        }
        to: {
            from: string
            to: string
            rate: number
        }
    },
    refCurrency: Array<string>
) {
    const currencyPairFromRate = currencyPair.from.rate;
    const currencyPairToRate = currencyPair.to.rate;
    let conversionRate = 0;

    let fromIntersect = [currencyPair.from.from, currencyPair.from.to];
    let toIntersect = [currencyPair.to.from, currencyPair.to.to];
    let intersectExists = (fromIntersect.filter(diff => !toIntersect.includes(diff))).length;

    /* when we don't need middle rate */
    if (intersectExists === 1) {
        (refCurrency.includes(currencyPair.from.from) &&
            refCurrency.includes(currencyPair.to.from)) ?
            conversionRate = (1 / currencyPairFromRate) * currencyPairToRate
            :
            (refCurrency.includes(currencyPair.from.to) &&
                refCurrency.includes(currencyPair.to.to)) ?
                conversionRate = currencyPairFromRate * (1 / currencyPairToRate)
                :
                (refCurrency.includes(currencyPair.from.from) &&
                    refCurrency.includes(currencyPair.to.to)) ?
                    conversionRate = (1 / currencyPairFromRate) * (1 / currencyPairToRate)
                    :
                    conversionRate = currencyPairFromRate * currencyPairToRate;
    }
    /* we have cross via using EURUSD currencyPair, EURUSD: { from: 'EUR', to: 'USD', rate: 1.2315 } */
    else {
        const middleRefRate = currencyRates.EURUSD.rate;

        (["EUR"].includes(currencyPair.from.from) && ["USD"].includes(currencyPair.to.to)) ?
            conversionRate = (1 / currencyPairFromRate)
            * middleRefRate * (1 / currencyPairToRate)
            :
            (["USD"].includes(currencyPair.from.from) && ["EUR"].includes(currencyPair.to.to)) ?
                conversionRate = (1 / currencyPairFromRate)
                * (1 / middleRefRate) * (1 / currencyPairToRate)
                :
                (["USD"].includes(currencyPair.from.to) && ["EUR"].includes(currencyPair.to.from)) ?
                    conversionRate = currencyPairFromRate
                    * (1 / middleRefRate) * currencyPairToRate
                    :
                    (["EUR"].includes(currencyPair.from.to) && ["USD"].includes(currencyPair.to.from)) ?
                        conversionRate = currencyPairFromRate
                        * middleRefRate * currencyPairToRate
                        :
                        (["USD"].includes(currencyPair.from.from) && ["EUR"].includes(currencyPair.to.from)) ?
                            conversionRate = (1 / currencyPairFromRate)
                            * (1 / middleRefRate) * currencyPairToRate
                            :
                            (["EUR"].includes(currencyPair.from.from) && ["USD"].includes(currencyPair.to.from)) ?
                                conversionRate = (1 / currencyPairFromRate)
                                * middleRefRate * currencyPairToRate
                                :
                                (["EUR"].includes(currencyPair.from.to) && ["USD"].includes(currencyPair.to.to)) ?
                                    conversionRate = currencyPairFromRate
                                    * middleRefRate * (1 / currencyPairToRate)
                                    :
                                    (["USD"].includes(currencyPair.from.to) && ["EUR"].includes(currencyPair.to.to)) ?
                                        conversionRate = currencyPairFromRate
                                        * (1 / middleRefRate) * (1 / currencyPairToRate)
                                        :
                                        conversionRate = 0;
    }

    return conversionRate;
}

export function rateCalculation(currencyRates: any, fromCurrency: any, toCurrency: any, refCurrency: any) {
    const pairExistance = Object.keys(currencyRates).find(key => key === `${fromCurrency}${toCurrency}`)
    let rate: any, currencyPair: {
        from: {
            from: string
            to: string
            rate: number
        }
        to: {
            from: string
            to: string
            rate: number
        }
    } = {
        from: {
            from: '',
            to: '',
            rate: 0
        },
        to: {
            from: '',
            to: '',
            rate: 0
        }
    };

    /* 1:1 */
    return (fromCurrency === toCurrency) ?
        rate = { [`${fromCurrency}${toCurrency}`]: 1 }
        /* inverted or CCY */
        :
        (pairExistance === undefined) ?
            /* inverted: when we have the reverse rate in table like for "USDAUD" we have "AUDUSD" */
            (((currencyRates[`${toCurrency}${fromCurrency}`]) ?
                rate = 1 / currencyRates[`${toCurrency}${fromCurrency}`].rate
                :
                /* CCY, cross via calculation */
                ((
                    currencyPair = makeFromToList(currencyRates, fromCurrency, toCurrency),
                    rate = crossViaCalculation(currencyRates, currencyPair, refCurrency)
                ))
                ,
                rate = { [`${fromCurrency}${toCurrency}`]: rate }))
            :
            /* Direct */
            rate = { [`${fromCurrency}${toCurrency}`]: (currencyRates[`${fromCurrency}${toCurrency}`]).rate };
}

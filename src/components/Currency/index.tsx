import React, { Dispatch, useEffect, useRef } from "react";
import { connect } from "react-redux";

import {
    GlobalStyle,
    AppWrapper,
    Error,
    CurrencyInfo,
    Loading,
} from "./styles";

import Input from './Input';
import CurrencyTypes from "./index.types";

import {
    getRate,
    fromChangeInput,
    toChangeInput,
    fromCurrencyChange,
    toCurrencyChange,
} from "../../store/actions/currency";

import currencyExchangeList from "../../consts/CurrencyCodes";
import { displayCurrency } from "../../utils/displayCurrency";

function Currency({
    error,
    isFetched,
    from,
    to,
    convertFrom,
    convertTo,
    fromChangeInput,
    fromCurrencyChange,
    toChangeInput,
    toCurrencyChange,
    getRate
}: CurrencyTypes) {
    const inputRef: any = useRef(null);

    useEffect(() => {
        inputRef?.current?.focus();
        getRate(convertFrom, convertTo);
    }, [getRate, convertFrom, convertTo, isFetched]);

    const currencyList = Object.values(currencyExchangeList);

    return (
        <>
            <GlobalStyle />
            {error && <Error>{error}</Error>}
            {!isFetched && !error && <Loading>Loading...</Loading>}
            {isFetched && (
                <AppWrapper>
                    <CurrencyInfo>
                        <p>
                            {displayCurrency({
                                currencyList,
                                currencyId: convertFrom,
                                number: from
                            })}{" "}
                            equals{" "}
                        </p>
                        <h4>
                            {displayCurrency({
                                currencyList,
                                currencyId: convertTo,
                                number: to
                            })}
                        </h4>
                    </CurrencyInfo>
                    <Input
                        currencyList={currencyList}
                        inputValue={from}
                        selectValue={convertFrom}
                        inputChange={e => fromChangeInput((e.target.value).replace(/[^0-9]/g, ""))}
                        selectChange={e => fromCurrencyChange(e.target.value)}
                        inputRef={inputRef}
                    />
                    <Input
                        currencyList={currencyList}
                        inputValue={to}
                        selectValue={convertTo}
                        inputChange={e => toChangeInput((e.target.value).replace(/[^0-9]/g, ""))}
                        selectChange={e => toCurrencyChange(e.target.value)}
                    />
                </AppWrapper>
            )}
        </>
    );
}

const mapStateToProps = ({ currency }: any) => ({
    currency: currency.data,
    error: currency.error,
    isFetched: currency.isFetched,
    from: currency.from,
    to: currency.to,
    convertFrom: currency.convertFrom,
    convertTo: currency.convertTo,
    toChangeInput: currency.toChangeInput,
    fromChangeInput: currency.fromChangeInput,
    fromCurrencyChange: currency.fromCurrencyChange,
    toCurrencyChange: currency.toCurrencyChange,
    getRate: currency.getRate
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getRate: (fromCurrency: string, toCurrency: string) => {
        dispatch(getRate(fromCurrency, toCurrency));
    },
    toChangeInput: (value: string) => {
        dispatch(toChangeInput(value));
    },
    fromChangeInput: (value: string) => {
        dispatch(fromChangeInput(value));
    },
    fromCurrencyChange: (payload: string) => {
        dispatch(fromCurrencyChange(payload));
    },
    toCurrencyChange: (payload: string) => {
        dispatch(toCurrencyChange(payload));
    },
});

export default React.memo(connect(
    mapStateToProps,
    mapDispatchToProps
)(Currency));

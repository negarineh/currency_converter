import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import {
    GlobalStyle,
    AppWrapper,
    Error,
    CurrencyInfo,
    Loading,
} from "./styles";

import Input from './Input';

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
}) {
    const inputRef = useRef(null);

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
                        inputChange={e => fromChangeInput(e.target.value)}
                        selectChange={e => fromCurrencyChange(e.target.value)}
                        inputRef={inputRef}
                    />
                    <Input
                        currencyList={currencyList}
                        inputValue={to}
                        selectValue={convertTo}
                        inputChange={e => toChangeInput(e.target.value)}
                        selectChange={e => toCurrencyChange(e.target.value)}
                    />
                </AppWrapper>
            )}
        </>
    );
}

const mapStateToProps = ({ currency }) => ({
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

const mapDispatchToProps = dispatch => ({
    getRate: (fromCurrency, toCurrency) => {
        dispatch(getRate(fromCurrency, toCurrency));
    },
    toChangeInput: value => {
        dispatch(toChangeInput(value));
    },
    fromChangeInput: value => {
        dispatch(fromChangeInput(value));
    },
    fromCurrencyChange: payload => {
        dispatch(fromCurrencyChange(payload));
    },
    toCurrencyChange: payload => {
        dispatch(toCurrencyChange(payload));
    },
});

export default React.memo(connect(
    mapStateToProps,
    mapDispatchToProps
)(Currency));

import {
    FETCH_CURRENCY,
    HANDLE_ERROR,
    FROM_CHANGE_INPUT,
    TO_CHANGE_INPUT,
    FROM_CURRENCY_CHANGE,
    TO_CURRENCY_CHANGE,
} from "./types";

import { CurrencyRates, RefCurrency } from "../../consts/CurrencyRates";
import { rateCalculation } from "../../utils/rateCalculation";

/**
 * @description Action responsible for error handling
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const handleError = payload => ({
    type: HANDLE_ERROR,
    payload
});

/**
 *
 * @param fromCurrency
 * @param toCurrency
 * @returns {Function}
 */
export const getRateRequest = (fromCurrency, toCurrency) =>
    rateCalculation(CurrencyRates, fromCurrency, toCurrency, RefCurrency);

/**
 *
 * @param fromCurrency
 * @param toCurrency
 * @returns {Function}
 */
export const getRate = (fromCurrency, toCurrency) => async dispatch => {
    try {
        const data = getRateRequest(fromCurrency, toCurrency);
        dispatch({
            type: FETCH_CURRENCY,
            payload: data
        });
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const fromChangeInput = payload => {
    return {
        type: FROM_CHANGE_INPUT,
        payload
    };
};

export const toChangeInput = payload => {
    return {
        type: TO_CHANGE_INPUT,
        payload
    };
};

/**
 *
 * @param payload
 * @returns {Function}
 */
export const fromCurrencyChange = payload => (dispatch, getState) => {
    try {
        const data = getRateRequest(payload, getState().currency.convertTo);

        dispatch({
            type: FETCH_CURRENCY,
            payload: data
        });

        dispatch({
            type: FROM_CURRENCY_CHANGE,
            payload: payload
        });

        dispatch({
            type: FROM_CHANGE_INPUT,
            payload: getState().currency.from
        });
    }
    catch (error) {
        dispatch(handleError(error));
    }
};

/**
 *
 * @param payload
 * @returns {Function}
 */
export const toCurrencyChange = payload => (dispatch, getState) => {
    try {
        const data = getRateRequest(getState().currency.convertFrom, payload);

        dispatch({
            type: FETCH_CURRENCY,
            payload: data
        });

        dispatch({
            type: TO_CURRENCY_CHANGE,
            payload: payload
        });

        dispatch({
            type: FROM_CHANGE_INPUT,
            payload: getState().currency.from
        });
    }
    catch (error) {
        dispatch(handleError(error));
    }
};

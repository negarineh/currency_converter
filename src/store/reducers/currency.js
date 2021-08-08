import {
    FETCH_CURRENCY,
    HANDLE_ERROR,
    FROM_CHANGE_INPUT,
    TO_CHANGE_INPUT,
    FROM_CURRENCY_CHANGE,
    TO_CURRENCY_CHANGE,
} from "../actions/types";
import { convert } from "../../utils/convert";

export default function rootReducer(state, { type, payload }) {
    switch (type) {
        case FETCH_CURRENCY:
            return {
                ...state,
                data: payload,
                isFetched: true
            };
        case HANDLE_ERROR:
            return {
                ...state,
                error: payload
            };
        case FROM_CHANGE_INPUT:
            return {
                ...state,
                to: payload
                    ? convert({ amount: payload.replace(/[^0-9]/g, ""), state, mode: "from" })
                    : payload.replace(/[^0-9]/g, ""),
                from: payload.replace(/[^0-9]/g, "")
            };
        case TO_CHANGE_INPUT:
            return {
                ...state,
                from: payload
                    ? convert({ amount: payload.replace(/[^0-9]/g, ""), state, mode: "to" })
                    : payload.replace(/[^0-9]/g, ""),
                to: payload.replace(/[^0-9]/g, "")
            };
        case TO_CURRENCY_CHANGE:
            return {
                ...state,
                convertTo: payload || state.convertTo
            };

        case FROM_CURRENCY_CHANGE:
            return {
                ...state,
                convertFrom: payload || state.convertFrom
            };

        default:
            return state || {};
    }
}

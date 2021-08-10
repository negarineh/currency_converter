import React from "react";

import SelectTypes from "./Select.types";
import { SelectCurrency } from "./styles";

const Select = ({ value, onChange, currencyList }: SelectTypes) => (
    <SelectCurrency value={value} onChange={onChange} name="currencyList">
        {currencyList.map(currency => (
            <option key={currency.id} value={currency.id}>
                {currency.currencyName}
            </option>
        ))}
    </SelectCurrency>
);

export default React.memo(Select);

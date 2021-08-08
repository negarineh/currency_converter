import React from 'react';
import {
    CurrencyConverter,
    Input,
} from "./styles";

import Select from "./Select";

function InputCurrency({
    currencyList,
    inputValue,
    selectValue,
    inputChange,
    selectChange,
    inputRef,
}) {
    return (
        <CurrencyConverter>
            <Input
                type="number"
                value={inputValue}
                onChange={inputChange}
                ref={inputRef}
            />

            <Select
                value={selectValue}
                onChange={selectChange}
                currencyList={currencyList}
            />
        </CurrencyConverter>
    )
}

export default React.memo(InputCurrency);

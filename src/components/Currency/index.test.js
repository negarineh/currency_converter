import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('core-js/stable');

configure({ adapter: new Adapter() });

import {
    GlobalStyle,
    AppWrapper,
    CurrencyInfo,
} from "./styles";
import Input from './Input';

import { currencyList } from './Input.test';

const isFetched = true;
const from = 'AUD';
const convertFrom = 0;
const fromChangeInput = jest.fn();
const fromCurrencyChange = jest.fn();
const to = 'AUD';
const convertTo = 0;
const toChangeInput = jest.fn();
const toCurrencyChange = jest.fn();
const value = 0;

test('Render index component', () => {
    const container = renderer.create(
        <>
            <GlobalStyle />
            {isFetched && (
                <AppWrapper>
                    <CurrencyInfo>
                        <p>
                            {value} Australian Dollar equals
                        </p>
                        <h4>
                            {value} United States Dollar
                        </h4>
                    </CurrencyInfo>
                    <Input
                        currencyList={currencyList}
                        inputValue={from}
                        selectValue={convertFrom}
                        inputChange={fromChangeInput}
                        selectChange={fromCurrencyChange}
                    />
                    <Input
                        currencyList={currencyList}
                        inputValue={to}
                        selectValue={convertTo}
                        inputChange={toChangeInput}
                        selectChange={toCurrencyChange}
                    />
                </AppWrapper>
            )}
        </>
    ).toJSON();
    expect(container).toMatchSnapshot();
});

test('it applies styles', () => {
    const appWrapper = shallow(
        <AppWrapper />
    );

    expect(appWrapper).toHaveLength(1);
    expect(appWrapper).toHaveStyleRule('text-align', 'center');
    expect(appWrapper).toHaveStyleRule('background-color', '#fff');
    expect(appWrapper).toHaveStyleRule('border-radius', '8px');
});

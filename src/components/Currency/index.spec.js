import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('core-js/stable');

configure({ adapter: new Adapter() });

import {
    GlobalStyle,
    AppWrapper,
    CurrencyInfo,
} from "./styles";
import Currency from './index';
import Input from './Input';

import { currencyList } from './Input.spec';

const isFetched = true;
const displayCurrency = jest.fn();
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
    // expect(tree).toHaveStyleRule('margin-bottom', '1rem');
    // expect(tree).not.toHaveStyleRule('opacity');
    // expect(tree).toHaveStyleRule('justify-content', 'center');

    // expect(tree.find(Input)).toHaveLength(1);
    // expect(tree.find(Input)).toHaveStyleRule('width', '14rem');
    // expect(tree.find(Input)).toHaveStyleRule('font-size', '0.9rem');
    // expect(tree.find(Input)).toHaveStyleRule('border-radius', '5px');
    // expect(tree.find(Input)).toHaveStyleRule('display', 'inline-block');
    // expect(tree.find(Input)).toHaveStyleRule('margin', '1rem');
});

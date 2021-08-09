import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('core-js/stable');

configure({ adapter: new Adapter() });

import InputCurrency from './Input';
import {
    CurrencyConverter,
    Input,
} from "./styles";
import Select from './Select';

export const currencyList = Object.values({
    "AUD": {
        "currencyName": "Australian Dollar",
        "currencySymbol": "$",
        "id": "AUD"
    },
    "CAD": {
        "currencyName": "Canadian Dollar",
        "currencySymbol": "$",
        "id": "CAD"
    },
});
const value = 0;
const onChange = jest.fn();

test('Render <Input />', () => {
    const container = renderer.create(
        <CurrencyConverter>
            <Input
                type="number"
                value={value}
                onChange={onChange}
            />

            <Select
                value={value}
                onChange={onChange}
                currencyList={currencyList}
            />
        </CurrencyConverter>
    ).toJSON();
    expect(container).toMatchSnapshot();
});

test('it applies styles', () => {
    const tree = shallow(
        <InputCurrency />
    );
    expect(tree).toHaveLength(1);
    expect(tree).toHaveStyleRule('display', 'inline-block');
    expect(tree).toHaveStyleRule('flex-direction', 'column');
    expect(tree).toHaveStyleRule('margin-bottom', '1rem');
    expect(tree).not.toHaveStyleRule('opacity');
    expect(tree).toHaveStyleRule('justify-content', 'center');

    expect(tree.find(Input)).toHaveLength(1);
    expect(tree.find(Input)).toHaveStyleRule('width', '14rem');
    expect(tree.find(Input)).toHaveStyleRule('font-size', '0.9rem');
    expect(tree.find(Input)).toHaveStyleRule('border-radius', '5px');
    expect(tree.find(Input)).toHaveStyleRule('display', 'inline-block');
    expect(tree.find(Input)).toHaveStyleRule('margin', '1rem');
});


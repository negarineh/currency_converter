import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Select from './Select';
import { currencyList } from './Input.spec';

const value = 0;
const onChange = jest.fn();

test('render <Select />', () => {
    const container = renderer.create(<Select value={value} onChange={onChange} currencyList={currencyList} />).toJSON();
    expect(container.firstChild).toMatchSnapshot();
});

test('it applies styles', () => {
    const tree = renderer.create(<Select value={0} onChange={() => { }} currencyList={[]} />).toJSON();
    expect(tree).toHaveStyleRule('height', '3rem');
    expect(tree).toHaveStyleRule('width', '20rem');
    expect(tree).toHaveStyleRule('background-color', '#fff');
    expect(tree).not.toHaveStyleRule('opacity');
    expect(tree).toHaveStyleRule('border-radius', '5px');
    expect(tree).toHaveStyleRule('padding', '0.7rem');
});

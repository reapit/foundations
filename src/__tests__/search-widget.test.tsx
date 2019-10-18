import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchWidget from '../search-widget';

describe('Search widget', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchWidget />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should match snapshot', () => {
    const wrapper = shallow(<SearchWidget />)
    expect(wrapper).toMatchSnapshot()
  })
})

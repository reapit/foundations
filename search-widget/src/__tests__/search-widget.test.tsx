import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchWidget, { searchForSale, searchToRent } from '../search-widget';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchWidget />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should match snapshot', () => {
    const wrapper = shallow(<SearchWidget/>)
    expect(wrapper).toMatchSnapshot()
  })
  it('searchToRent', () => {
    const mockSetSearching = jest.fn()
    const mockEvent = {
      preventDefault: jest.fn()
    } as any
    const fn = searchToRent(mockSetSearching)
    fn(mockEvent)
    expect(mockSetSearching).toBeCalledWith(true)
  })
  it('searchForSale', () => {
    const mockSetSearching = jest.fn()
    const mockEvent = {
      preventDefault: jest.fn()
    } as any
    const fn = searchForSale(mockSetSearching)
    fn(mockEvent)
    expect(mockSetSearching).toBeCalledWith(true)
  })
})

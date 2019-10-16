import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchWidget, { searchForSale, searchToRent, handleInputChange } from '../search-widget';

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
    const fn = searchToRent({setSearching: mockSetSearching, inputValue: ''})
    fn(mockEvent)
    expect(mockSetSearching).toBeCalledWith(true)
  })
  it('searchForSale', () => {
    const mockSetSearching = jest.fn()
    const mockEvent = {
      preventDefault: jest.fn()
    } as any
    const fn = searchForSale({setSearching: mockSetSearching, inputValue: ''})
    fn(mockEvent)
    expect(mockSetSearching).toBeCalledWith(true)
  })
  it('handleInputChange', () => {
    const mockSetInputValue = jest.fn()
    const mockEvent = {
      target: {
        value: ''
      }
    }
    const fn = handleInputChange(mockSetInputValue)
    fn(mockEvent)
    expect(mockSetInputValue).toBeCalled()

  })
})

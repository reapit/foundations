import React from 'react'
import { shallow, mount } from 'enzyme'
import { SearchableDropdown, ControlledSearchableDropdown, SearchableDropdownControlledInner } from '..'

describe('SearchableDropdown component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <SearchableDropdown getResults={async () => []} getResultLabel={() => ''} getResultValue={() => ''} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ControlledSearchableDropdown component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <ControlledSearchableDropdown
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={false}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should show a list of results when given', () => {
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[{ label: 'test', result: 'test' }]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={true}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    expect(wrapper.find('ElSearchableDropdownResult')).toBeDefined
  })

  it('should not show a list of results when not given', () => {
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={false}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    expect(wrapper.find('ElSearchableDropdownResult')).not.toBeDefined
  })

  it('should show the clear button when isClearVisible is true', () => {
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={true}
        isResultsListVisible={false}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    expect(wrapper.find('ElSearchableDropdownCloseButton')).toBeDefined
  })

  it('should not show the clear button when isClearVisible is false', () => {
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={false}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    expect(wrapper.find('ElSearchableDropdownCloseButton')).not.toBeDefined
  })

  it('should show the loader when loading is true', () => {
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={false}
        loading={true}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    expect(wrapper.find('ElSearchableDropdownSearchLoader')).toBeDefined
  })

  it('should not show the loader when loading is false', () => {
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={false}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    expect(wrapper.find('ElSearchableDropdownSearchLoader')).not.toBeDefined
  })

  it('should call onClear when the clear button is clicked', () => {
    const onClear = jest.fn()
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={true}
        isResultsListVisible={false}
        loading={false}
        onClear={onClear}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    wrapper.find('ElSearchableDropdownCloseButton').simulate('click')
    expect(onClear).toHaveBeenCalled()
  })

  it('should call onChange when the text input is typed into', () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[]}
        onChange={onChange}
        isClearVisible={false}
        isResultsListVisible={false}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
      />,
    )
    wrapper.find('ElSearchableDropdownSearchInput').simulate('change', { target: { value: 'test' } })
    expect(onChange).toHaveBeenCalled()
  })
  it('should call onResultClick when a result is clicked on', () => {
    const onResultClick = jest.fn()
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[{ label: 'test', result: 'test' }]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={true}
        loading={false}
        onClear={() => {}}
        onResultClick={onResultClick}
        selectedValue={''}
      />,
    )
    wrapper.find('ElSearchableDropdownResult').simulate('click')
    expect(onResultClick).toHaveBeenCalled()
  })

  it('should display the selected value in the ref input when present', () => {
    const ref = React.createRef<HTMLInputElement>()
    mount(
      <ControlledSearchableDropdown
        resultsList={[]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={false}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue="test"
        ref={ref}
      />,
    )
    expect(ref?.current?.value).toEqual('test')
  })

  it('should display the given value in the search box', () => {
    const wrapper = shallow(
      <SearchableDropdownControlledInner
        resultsList={[{ label: 'test', result: 'test' }]}
        onChange={() => {}}
        isClearVisible={false}
        isResultsListVisible={true}
        loading={false}
        onClear={() => {}}
        onResultClick={() => {}}
        selectedValue={''}
        value="asdf"
      />,
    )
    expect(wrapper.find('ElSearchableDropdownSearchInput').prop('value')).toEqual('asdf')
  })
})

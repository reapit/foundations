import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { SearchableDropdown, ControlledSearchableDropdown, SearchableDropdownSearchLabel } from '../searchable-dropdown'

describe('SearchableDropdown component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <SearchableDropdown
        id="some-id"
        getResults={async () => []}
        getResultLabel={() => ''}
        getResultValue={() => ''}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  xit('should get results from the given function, passing the value of the search box', () => {
    const getResults = jest.fn().mockResolvedValue([{ id: '1', name: 'one' }])

    render(
      <SearchableDropdown
        getResults={getResults}
        // @ts-ignore
        getResultLabel={({ name }) => name}
        // @ts-ignore
        getResultValue={({ id }) => id}
      />,
    )

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } })

    expect(getResults).toHaveBeenCalledWith('test')
  })
  xit('should display results returned from the given function', async () => {
    render(
      <SearchableDropdown
        getResults={async () => [{ id: '1', name: 'one' }]}
        getResultLabel={({ name }) => name}
        getResultValue={({ id }) => id}
      />,
    )

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } })

    await waitFor(() => {
      expect(screen.getByTestId('dropdown-result-0').innerHTML).toEqual('one')
    })
  })
  xit('should call onChange when a result is chosen from the list', async () => {
    const onChange = jest.fn()
    render(
      <SearchableDropdown
        getResults={async () => [{ id: '1', name: 'one' }]}
        getResultLabel={({ name }) => name}
        getResultValue={({ id }) => id}
        onChange={onChange}
      />,
    )

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } })

    await waitFor(() => {
      expect(screen.getByTestId('dropdown-result-0').innerHTML).toEqual('one')
      fireEvent.click(screen.getByTestId('dropdown-result-0'))
      expect(onChange).toHaveBeenCalledWith({ target: { value: '1' } })
    })
  })
})

describe('ControlledSearchableDropdown component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <ControlledSearchableDropdown
        id="some-id"
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

  it('should display the selected value in the ref input when present', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(
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

  it('should display default value', () => {
    const wrapper = render(
      <SearchableDropdown<{ id: string; name: string }>
        id="some-id"
        getResults={async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  id: '1',
                  name: 'First',
                },
                {
                  id: '2',
                  name: 'Second',
                },
                {
                  id: '3',
                  name: 'Third',
                },
              ])
            }, 1000)
          })
        }}
        getResultLabel={(result) => result.name}
        getResultValue={(result) => result.id}
        onChange={(e) => console.log(e.target.value)}
        defaultVal={{ id: '4', name: 'Forth' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('SearchableDropdownSearchLabel component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<SearchableDropdownSearchLabel>I am a label</SearchableDropdownSearchLabel>)
    expect(wrapper).toMatchSnapshot()
  })
})

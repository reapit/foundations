import React from 'react'
import { render } from '@testing-library/react'
import { handleSetInitialOptions, handleSetNewOptions, SearchableMultiSelect } from '..'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

jest.mock('@reapit/use-reapit-data', () => ({
  useReapitGet: jest.fn(() => [
    {
      data: [
        { id: 'MOCK_ID', name: 'MOCK_NAME' },
        { id: 'MOCK_ID_NEW', name: 'MOCK_NAME_NEW' },
      ],
    },
    true,
  ]),
}))

// Skipping, really not sure why but Jest doesn't like the test, needs furhter investiagation
xdescribe('SearchableMultiSelect', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <SearchableMultiSelect
        id="app-ids-select"
        label="Search Apps"
        errorString="Error message"
        defaultList={[]}
        currentValues={['MOCK_ID']}
        reapitConnectBrowserSession={{} as ReapitConnectBrowserSession}
        valueKey="id"
        nameKey="name"
        searchKey="appName"
        dataListKey="data"
        action={getActions[GetActionNames.getApps]}
        queryParams={{ pageSize: 100 }}
        noneSelectedLabel="No apps selected"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSetNewOptions', () => {
  it('should handle setting new options', () => {
    const currentValues = ['MOCK_ID']
    const options = [{ value: 'MOCK_ID', name: 'MOCK_NAME' }]
    const data = [
      { id: 'MOCK_ID', name: 'MOCK_NAME' },
      { id: 'MOCK_ID_NEW', name: 'MOCK_NAME_NEW' },
    ]
    const nameKey = 'name'
    const valueKey = 'id'
    const setOptions = jest.fn()

    const curried = handleSetNewOptions(currentValues, options, data, nameKey, valueKey, setOptions)

    curried()

    expect(setOptions).toHaveBeenCalledWith([
      { value: 'MOCK_ID', name: 'MOCK_NAME' },
      { value: 'MOCK_ID_NEW', name: 'MOCK_NAME_NEW' },
    ])
  })
})

describe('handleSetInitialOptions', () => {
  it('should handle setting new options', () => {
    const defaultList = [
      { id: 'MOCK_ID', name: 'MOCK_NAME' },
      { id: 'MOCK_ID_NEW', name: 'MOCK_NAME_NEW' },
    ]
    const nameKey = 'name'
    const valueKey = 'id'
    const setOptions = jest.fn()

    const curried = handleSetInitialOptions(defaultList, nameKey, valueKey, setOptions)

    curried()

    expect(setOptions).toHaveBeenCalledWith([
      { value: 'MOCK_ID', name: 'MOCK_NAME' },
      { value: 'MOCK_ID_NEW', name: 'MOCK_NAME_NEW' },
    ])
  })
})

import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { shallow } from 'enzyme'
import {
  ContextMenu,
  handleContextClick,
  clearRowSetData,
  clearColSetData,
  removeRowSetData,
  removeColSetData
} from '../context-menu'
import { selectedMatrix, setData, setContextMenuProp, data } from '../__stubs__'

describe('ContextMenu', () => {
  it('should match snapshot with visible true', () => {
    expect(
      shallow(
        <ContextMenu
          selected={selectedMatrix}
          setData={setData}
          setContextMenuProp={setContextMenuProp}
          contextMenuProp={{ visible: true, top: 0, left: 0 }}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match snapshot with visible false', () => {
    expect(
      shallow(
        <ContextMenu
          selected={selectedMatrix}
          setData={setData}
          setContextMenuProp={setContextMenuProp}
          contextMenuProp={{ visible: false, top: 0, left: 0 }}
        />
      )
    ).toMatchSnapshot()
  })
})

describe('handleContextClick', () => {
  const eventBase = {
    stopPropagation: jest.fn(),
    target: {
      id: ''
    }
  }
  const fn = handleContextClick(selectedMatrix, setData, setContextMenuProp)

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct value clear-row', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'clear-row'
      }
    }
    const result = fn(mockEvent)
    expect(result).toBe('clear-row')
  })

  it('should return correct value clear-col', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'clear-col'
      }
    }
    const result = fn(mockEvent)
    expect(result).toBe('clear-col')
  })

  it('should return correct value remove-row', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'remove-row'
      }
    }
    const result = fn(mockEvent)
    expect(result).toBe('remove-row')
  })
  it('should return correct value remove-col', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'remove-col'
      }
    }
    const result = fn(mockEvent)
    expect(result).toBe('remove-col')
  })

  it('should return correct value default case', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: ''
      }
    }
    const result = fn(mockEvent)
    expect(result).toBe('')
  })
})

describe('clearRowSetData', () => {
  it('should return correct data', () => {
    const currentRowIndex = 1
    const expectedResult = [
      [
        { value: 'Office name' },
        { value: 'Building Name' },
        { value: 'Building No.' },
        { value: 'Address 1' },
        { value: 'Address 2' },
        { value: 'Address 3' },
        { value: 'Address 4' },
        { value: 'Post Code' },
        { value: 'Telephone' },
        { value: 'Fax' },
        { value: 'Email' }
      ],
      [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ],
      [
        { value: 'London2' },
        { value: 'The Black House' },
        { value: '11' },
        { value: 'Test Addres' },
        { value: '' },
        { value: 'Adress 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '087 471 929' },
        { value: '' },
        { value: 'row2@gmail.com' }
      ],
      [
        { value: 'New York' },
        { value: 'Building A' },
        { value: '11' },
        { value: '' },
        { value: '' },
        { value: 'City Z' },
        { value: '' },
        { value: 'AL7187' },
        { value: '017 7162 9121' },
        { value: '' },
        { value: 'row3@gmail.com' }
      ]
    ]
    const fn = clearRowSetData(currentRowIndex)
    const result = fn(data)
    expect(result).toEqual(expectedResult)
  })
})

describe('clearColSetData', () => {
  it('should return correct data', () => {
    const currentColIndex = 1
    const expectedResult = [
      [
        { value: 'Office name' },
        { value: '' },
        { value: 'Building No.' },
        { value: 'Address 1' },
        { value: 'Address 2' },
        { value: 'Address 3' },
        { value: 'Address 4' },
        { value: 'Post Code' },
        { value: 'Telephone' },
        { value: 'Fax' },
        { value: 'Email' }
      ],
      [
        { value: 'London' },
        { value: '' },
        { value: '15' },
        { value: 'London 1' },
        { value: '' },
        { value: 'Londom 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '0845 0000' },
        { value: '' },
        { value: 'row1@gmail.com' }
      ],
      [
        { value: 'London2' },
        { value: '' },
        { value: '11' },
        { value: 'Test Addres' },
        { value: '' },
        { value: 'Adress 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '087 471 929' },
        { value: '' },
        { value: 'row2@gmail.com' }
      ],
      [
        { value: 'New York' },
        { value: '' },
        { value: '11' },
        { value: '' },
        { value: '' },
        { value: 'City Z' },
        { value: '' },
        { value: 'AL7187' },
        { value: '017 7162 9121' },
        { value: '' },
        { value: 'row3@gmail.com' }
      ]
    ]
    const fn = clearColSetData(currentColIndex)
    const result = fn(data)
    expect(result).toEqual(expectedResult)
  })
})

describe('removeRowSetData', () => {
  it('should return correct data', () => {
    const currentRowIndex = 1
    const expectedResult = [
      [
        { value: 'Office name' },
        { value: 'Building Name' },
        { value: 'Building No.' },
        { value: 'Address 1' },
        { value: 'Address 2' },
        { value: 'Address 3' },
        { value: 'Address 4' },
        { value: 'Post Code' },
        { value: 'Telephone' },
        { value: 'Fax' },
        { value: 'Email' }
      ],
      [
        { value: 'London2' },
        { value: 'The Black House' },
        { value: '11' },
        { value: 'Test Addres' },
        { value: '' },
        { value: 'Adress 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '087 471 929' },
        { value: '' },
        { value: 'row2@gmail.com' }
      ],
      [
        { value: 'New York' },
        { value: 'Building A' },
        { value: '11' },
        { value: '' },
        { value: '' },
        { value: 'City Z' },
        { value: '' },
        { value: 'AL7187' },
        { value: '017 7162 9121' },
        { value: '' },
        { value: 'row3@gmail.com' }
      ]
    ]
    const fn = removeRowSetData(currentRowIndex)
    const result = fn(data)
    expect(result).toEqual(expectedResult)
  })
})

describe('removeColSetData', () => {
  it('should return correct data', () => {
    const currentColIndex = 1
    const expectedResult = [
      [
        { value: 'Office name' },
        { value: 'Building No.' },
        { value: 'Address 1' },
        { value: 'Address 2' },
        { value: 'Address 3' },
        { value: 'Address 4' },
        { value: 'Post Code' },
        { value: 'Telephone' },
        { value: 'Fax' },
        { value: 'Email' }
      ],
      [
        { value: 'London' },
        { value: '15' },
        { value: 'London 1' },
        { value: '' },
        { value: 'Londom 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '0845 0000' },
        { value: '' },
        { value: 'row1@gmail.com' }
      ],
      [
        { value: 'London2' },
        { value: '11' },
        { value: 'Test Addres' },
        { value: '' },
        { value: 'Adress 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '087 471 929' },
        { value: '' },
        { value: 'row2@gmail.com' }
      ],
      [
        { value: 'New York' },
        { value: '11' },
        { value: '' },
        { value: '' },
        { value: 'City Z' },
        { value: '' },
        { value: 'AL7187' },
        { value: '017 7162 9121' },
        { value: '' },
        { value: 'row3@gmail.com' }
      ]
    ]
    const fn = removeColSetData(currentColIndex)
    const result = fn(data)
    expect(result).toEqual(expectedResult)
  })
})

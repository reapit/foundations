import * as React from 'react'
import { Cell, SetData, SetSelected, SetUploadData, SetContextMenuProp, AfterCellsChanged } from '../types'

export const parseResult = {
  data: [
    [
      'Office name',
      'Building Name',
      'Building No.',
      'Address 1',
      'Address 2',
      'Address 3',
      'Address 4',
      'Post Code',
      'Telephone',
      'Fax',
      'Email',
    ],
    ['London', 'The White House', '15', 'London 1', '', 'Londom 3', '', 'EC12NH', '0845 0000', '', 'row1@gmail.com'],
    [
      'London2',
      'The Black House',
      '11',
      'Test Addres',
      '',
      'Adress 3',
      '',
      'EC12NH',
      '087 471 929',
      '',
      'row2@gmail.com',
    ],
    ['New York', 'Building A', '11', '', '', 'City Z', '', 'AL7187', '017 7162 9121', '', 'row3@gmail.com'],
  ],
  errors: [],
  meta: { delimiter: ',', linebreak: '\r\n', aborted: false, truncated: false, cursor: 345 },
}

export const data: Cell[][] = [
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
    { value: 'Email' },
  ],
  [
    { value: 'London' },
    { value: 'The White House' },
    { value: '15' },
    { value: 'London 1' },
    { value: '' },
    { value: 'Londom 3' },
    { value: '' },
    { value: 'EC12NH' },
    { value: '0845 0000' },
    { value: '' },
    { value: 'row1@gmail.com' },
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
    { value: 'row2@gmail.com' },
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
    { value: 'row3@gmail.com' },
  ],
]

export const cellRenderProps = {
  row: 3,
  col: 10,
  cell: { value: 'row3@gmail.com' },
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: jest.fn() as any,
  className: 'cell',
  style: { background: 'red' },
  onMouseDown: jest.fn(),
  onMouseOver: jest.fn(),
  onDoubleClick: jest.fn(),
  onContextMenu: jest.fn(),
  children: <div>hi</div>,
}

export const setData: SetData = jest.fn()

export const setSelected: SetSelected = jest.fn()
export const setContextMenuProp: SetContextMenuProp = jest.fn()
export const setUploadData: SetUploadData = jest.fn()

export const selectedMatrix = {
  start: { i: 0, j: 1 },
  end: { i: 2, j: 3 },
}

export const afterCellsChanged = jest.fn() as AfterCellsChanged

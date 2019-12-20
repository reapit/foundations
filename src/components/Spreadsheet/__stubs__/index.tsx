import * as React from 'react'
import { Cell, SelectedMatrix } from '../types'
import ReactDataSheet from 'react-datasheet'

export const data: Cell[][] = [
  [
    { readOnly: true, value: 'Office Name' },
    { readOnly: true, value: 'Building Name' },
    { readOnly: true, value: 'Building No.' },
    { readOnly: true, value: 'Address 1' },
    { readOnly: true, value: 'Address 2' },
    { readOnly: true, value: 'Address 3' },
    { readOnly: true, value: 'Address 4' },
    { readOnly: true, value: 'Post Code' },
    { readOnly: true, value: 'Telephone' },
    { readOnly: true, value: 'Fax' },
    { readOnly: true, value: 'Email' }
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
    { value: 'row1@gmail.com' }
  ],
  [
    { value: 'London2' },
    { value: 'The Black House' },
    { value: '11' },
    { value: '' },
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

export const cellRenderProps: ReactDataSheet.CellRendererProps<Cell> = {
  row: 3,
  col: 10,
  cell: { value: 'row3@gmail.com' },
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: jest.fn() as ReactDataSheet.AttributesRenderer<Cell>,
  className: 'cell',
  style: { background: 'red' },
  onMouseDown: jest.fn(),
  onMouseOver: jest.fn(),
  onDoubleClick: jest.fn(),
  onContextMenu: jest.fn(),
  children: <div>hi</div>
}

export const setData: React.Dispatch<Cell[][]> = jest.fn()

export const setSelected: React.Dispatch<SelectedMatrix> = jest.fn()

export const selectedMatrix = {
  start: { i: 0, j: 1 },
  end: { i: 2, j: 3 }
}

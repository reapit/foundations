import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spreadsheet, setCurrentCellValue, Cell } from './index'

storiesOf('Spreadsheet', module)
  .add('Basic', () => {
    const dataBasic = [
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

    return (
      <Spreadsheet
        data={dataBasic}
        description={
          <p>
            <strong>Basic DataSheet</strong>
            <br />
            You can double click a column header to select the entire column's cells.
            <br />
            Select one or multiple cells and press Delete/Backspace to delete it value.
          </p>
        }
      />
    )
  })
  .add('Validate', () => {
    const dataValidate = [
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
        { value: '11aa', validate: cell => Number.isInteger(Number(cell.value)) },
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
        {
          value: 'row3@com',
          validate: cell => {
            const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            return emailRegex.test(cell.value)
          }
        }
      ]
    ]
    return (
      <Spreadsheet
        data={dataValidate}
        description={
          <p>
            <strong>DataSheet with validate</strong>
            <br />
            Errors are marked with red background
          </p>
        }
      />
    )
  })
  .add('Custom Style', () => {
    const dataBasic = [
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
    const dataCustomStyle = (dataBasic as Cell[][]).map((e, i) => {
      if (i % 2 !== 0) {
        /* customize by style */
        return e.map(c => ({
          ...c,
          style: {
            background: '#6A5ACD',
            color: '#fff'
          }
        }))
      }
      /* customize by className */
      return e.map(c => ({
        ...c,
        className: 'custom-classname-style'
      }))
    })

    return (
      <Spreadsheet
        data={dataCustomStyle}
        description={
          <p>
            <strong>DataSheet with custom styles</strong>
            <br />
            Add custom style to cell by using className property of cell
            <br />
            Or if you want to override default style, use style proprty
          </p>
        }
      />
    )
  })
  .add('Custom Component', () => {
    /* follow this pattern to create custom eleemnt */
    const CustomComponent = ({ cellRenderProps, data, setData }) => {
      return (
        <select
          /* use the cell value as select value */
          value={cellRenderProps.cell.value}
          onChange={e => {
            const { row, col } = cellRenderProps
            /* set the current cell value */
            setCurrentCellValue(e.target.value, data, row, col, setData)
          }}
        >
          <option value="White House">White House</option>
          <option value="Blue House">Blue House</option>
          <option value="Black House">Black House</option>
        </select>
      )
    }

    const dataCustomComponent = [
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
        {
          value: 'The White House',
          CustomComponent
        },
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
    return (
      <Spreadsheet
        data={dataCustomComponent}
        description={
          <p>
            <strong>
              DataSheet with <code>&#x3C;select&#x3E;</code>
            </strong>
            <br />
            You can create a cell which include custom component by using CustomComponent property, here we use{' '}
            <code>&#x3C;select&#x3E;</code> as an example. Follow this pattern to create various types of custom
            components
          </p>
        }
      />
    )
  })
  .add('Spreadsheet only', () => {
    const dataBasic = [
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

    return <Spreadsheet data={dataBasic} hasAddButton={false} hasUploadButton={false} hasDownloadButton={false} />
  })
  .add('Spreadsheet with validate upload', () => {
    const dataBasic = [
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
      ]
    ]

    return (
      <Spreadsheet
        data={dataBasic}
        validateUpload={data =>
          data.map(row =>
            row.map(cell => {
              return {
                ...cell,
                validate: cell => Number.isInteger(Number(cell.value))
              }
            })
          )
        }
        description={
          <p>
            <strong>
              DataSheet with <code>validateUpload</code>, try to upload a csv file
            </strong>
            <br />
            <code>validateUpload</code> function will run before data is set to table, should return{' '}
            <code>Cell[][]</code> with each cell contain <code>validate</code> property
            <br />
            Here, check if cell value is convertible to integer
          </p>
        }
      />
    )
  })

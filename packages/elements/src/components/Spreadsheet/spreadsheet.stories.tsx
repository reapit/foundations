import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spreadsheet, Cell } from './index'

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
        { readOnly: true, value: 'Email' },
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
        { value: '' },
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

    return (
      <Spreadsheet
        data={dataBasic}
        description={
          <p>
            <strong>Basic Spreadsheet</strong>
            <br />
            You can double click a column header to select the entire column&apos;s cells.
            <br />
            Select one or multiple cells and press Delete/Backspace to delete it value.
          </p>
        }
      />
    )
  })
  .add('Validate', () => {
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
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
        { readOnly: true, value: 'Email' },
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
        { value: '' },
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
        {
          value: 'row3@com',
        },
      ],
    ]
    return (
      <Spreadsheet
        data={dataValidate}
        validate={data =>
          data.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (colIndex === 10) {
                if (emailRegex.test(data[rowIndex][colIndex].value as string)) {
                  return true
                }
                return false
              }
              return true
            }),
          )
        }
        description={
          <p>
            <strong>Spreadsheet with validate</strong>
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
        { readOnly: true, value: 'Email' },
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
        { value: '' },
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
    const dataCustomStyle = (dataBasic as Cell[][]).map((e, i) => {
      if (i % 2 !== 0) {
        /* customize by style */
        return e.map(c => ({
          ...c,
          style: {
            background: '#6A5ACD',
            color: '#fff',
          },
        }))
      }
      /* customize by className */
      return e.map(c => ({
        ...c,
        className: 'custom-classname-style',
      }))
    })

    return (
      <Spreadsheet
        data={dataCustomStyle}
        description={
          <p>
            <strong>Spreadsheet with custom styles</strong>
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
    /* follow this pattern to create custom component */
    const CustomComponent = ({ cellRenderProps, data, setData, afterCellsChanged }) => {
      return (
        <select
          // use the cell value as select value
          value={cellRenderProps.cell.value}
          onChange={e => {
            const newValue = e.target.value
            const { row, col, cell: oldCell } = cellRenderProps
            // create new data array
            const newData = data.map(row => row.map(cell => ({ ...cell })))
            newData[row][col].value = newValue
            setData(newData)
            // create changes and trigger afterCellsChanged
            const changes = [{ oldCell, row, col, newCell: { ...oldCell, value: newValue } }]
            afterCellsChanged(changes, newData, setData)
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
        { readOnly: true, value: 'Email' },
      ],
      [
        { value: 'London' },
        {
          value: 'The White House',
          CustomComponent,
        },
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
        { value: '' },
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
    return (
      <Spreadsheet
        data={dataCustomComponent}
        afterCellsChanged={(changes, data, setData) => {
          console.log('changes', changes)
          console.log('data after change', data)
          console.log('setData', setData)
        }}
        description={
          <p>
            <strong>
              Spreadsheet with <code>&#x3C;select&#x3E;</code>
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
        { readOnly: true, value: 'Email' },
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
        { value: '' },
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

    return <Spreadsheet data={dataBasic} hasAddButton={false} hasUploadButton={false} hasDownloadButton={false} />
  })
  .add('Spreadsheet with afterDataChanged', () => {
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
        { readOnly: true, value: 'Email' },
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
        { value: '' },
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
    return (
      <Spreadsheet
        data={dataBasic}
        afterDataChanged={(data, changes) => {
          console.log('data after changes', data)
          console.log('changes', changes)
        }}
        description={
          <p>
            <strong>
              Spreadsheet with <code>afterDataChanged</code>
            </strong>
            <br />
            The <code>afterDataChanged</code> function will be call after data is changed
            <br />
            Calling <code>setData</code> will trigger <code>afterDataChanged</code>
          </p>
        }
      />
    )
  })
  .add('Spreadsheet with afterCellsChanged', () => {
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
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
        { readOnly: true, value: 'Email' },
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
        { value: '' },
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
        { value: 'row3@gmail' },
      ],
    ]
    return (
      <Spreadsheet
        data={dataBasic}
        validate={data =>
          data.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (colIndex === 10) {
                if (emailRegex.test(data[rowIndex][colIndex].value as string)) {
                  return true
                }
                return false
              }
              return true
            }),
          )
        }
        afterCellsChanged={(changes, data, setData) => {
          console.log('changes', changes)
          console.log('data after changes', data)
          console.log('setData', setData)
        }}
        description={
          <p>
            <strong>
              Spreadsheet with <code>afterCellsChanged</code>
            </strong>
            <br />
            The <code>afterCellsChanged</code> function will be call after an input in a cell changed Calling
            <br />
            Calling <code>setData</code> will not trigger afterCellsChanged
          </p>
        }
      />
    )
  })
  .add('Spreadsheet with custom props', () => {
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
        { readOnly: true, value: 'Email' },
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
        { value: '' },
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
        { value: 'row3@gmail' },
      ],
    ]
    return (
      <Spreadsheet
        data={dataBasic}
        overflow="clip"
        description={
          <p>
            <strong>Spreadsheet with custom props</strong>
            <br />
            You can provide custom props here, see list of supported props{' '}
            <a href="https://github.com/nadbm/react-datasheet#options">here</a>
            <br />
            For example, here we set <code>overflow=&quot;clip&quot;</code>
          </p>
        }
      />
    )
  })

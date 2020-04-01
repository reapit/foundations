import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spreadsheet, Cell } from './index'
import { PortalProvider } from '../../hooks/UsePortal'

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
      <PortalProvider>
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
      </PortalProvider>
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
      <PortalProvider>
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
              The <code>validate</code> function must return with correct format
              <br />
              For example: return <code>[ [true, false], [true, true] ]</code> in case your spreadsheet has{' '}
              <code>2x2</code> (row X column)
              <br />
              Errors are marked with red background
            </p>
          }
        />
      </PortalProvider>
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
      <PortalProvider>
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
      </PortalProvider>
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
            if (typeof afterCellsChanged === 'function') {
              // create changes and trigger afterCellsChanged
              const changes = [{ oldCell, row, col, newCell: { ...oldCell, value: newValue } }]
              afterCellsChanged(changes, newData, setData)
            }
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
      <PortalProvider>
        <Spreadsheet
          data={dataCustomComponent as Cell[][]}
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
              <code>&#x3C;select&#x3E;</code> as an example. Follow the below pattern to create various types of custom
              components
            </p>
          }
        />
      </PortalProvider>
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

    return (
      <PortalProvider>
        <Spreadsheet data={dataBasic} hasAddButton={false} hasUploadButton={false} hasDownloadButton={false} />
      </PortalProvider>
    )
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
      <PortalProvider>
        <Spreadsheet
          data={dataBasic}
          afterDataChanged={(data, changes) => {
            console.log('data after changes', data)
            console.log('changes', changes)
          }}
          description={
            <p>
              <strong>
                Spreadsheet with <code>afterDataChanged</code> (open console to see the logs)
              </strong>
              <br />
              The <code>afterDataChanged</code> function will be call <strong>EVERYTIME</strong> after data is changed
              <br />
              Calling <code>setData</code> <strong>WILL TRIGGER</strong> <code>afterDataChanged</code>
            </p>
          }
        />
      </PortalProvider>
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
      <PortalProvider>
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
                Spreadsheet with <code>afterCellsChanged</code> (open console to see the logs)
              </strong>
              <br />
              The <code>afterCellsChanged</code> function will be call <strong>ONLY AFTER THESE CASES:</strong>
              <br />
              <ul>
                <li>- Typing into a cell&apos; input</li>
                <li>- Clear row (in context menu right-click)</li>
                <li>
                  - Remove row (in context menu right-click), in this case, <code>newCell</code> will be{' '}
                  <code>&#123; value:null &#125;</code>
                </li>
                <li>- Clear column (in context menu right-click)</li>
                <li>
                  - Remove column (in context menu right-click), in this case, <code>newCell</code> will be{' '}
                  <code>&#123; value:null &#125;</code>
                </li>
              </ul>
              <br />
              Calling <code>setData</code> <strong>WILL NOT TRIGGER</strong> <code>afterCellsChanged</code>
            </p>
          }
        />
      </PortalProvider>
    )
  })
  .add('Upload with validate', () => {
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
          value: 'row3@gmail.com',
        },
      ],
    ]
    return (
      <PortalProvider>
        <Spreadsheet
          data={dataValidate}
          validate={data =>
            data.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                if (rowIndex === 0) {
                  return true
                }
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
          afterUploadDataValidated={({ uploadData, currentData, setData }) => {
            console.log('uploadData', uploadData)
            console.log('currentData', currentData)
            console.log('setData', setData)
            // append validated data to bottom of Spreadsheet
            setData(prev => [...prev, ...uploadData.validatedData])
          }}
          description={
            <p>
              <strong>Spreadsheet with validate</strong>
              <br />
              Try to download this file, replace one email field with invalid email, and reupload again.
              <br />
              It is up to you to handle after uploading. The<code>afterUploadDataValidated</code> function will be
              called after finish validating uploaded data
            </p>
          }
        />
      </PortalProvider>
    )
  })

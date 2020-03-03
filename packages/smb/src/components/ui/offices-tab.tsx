import * as React from 'react'
import { Spreadsheet } from '@reapit/elements'

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

export type OfficesTabProps = {}

export const OfficesTab: React.FC<OfficesTabProps> = () => {
  return (
    <div>
      <Spreadsheet
        data={dataBasic}
        description={
          <p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>
          </p>
        }
      />
    </div>
  )
}

export default OfficesTab

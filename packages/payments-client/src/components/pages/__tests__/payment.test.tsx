import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentPage from '../payment'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      amount: 50,
      clientAccountName: 'Lettings Client Acc',
      companyId: null,
      customer: {
        id: 'RPT17000005',
        email: 'max@atkinson.co.uk',
        forename: 'Max',
        mobilePhone: '077865932145',
        name: 'Mr Max Atkinson',
        primaryAddress: {
          buildingName: 'Flat 5',
          buildingNumber: '17',
          countryId: 'GB',
          line1: 'Hans Crescent',
          line2: 'Knightbridge',
          line3: 'London',
          line4: '',
          postcode: 'SW1X 0LG',
        },
        surname: 'Atkinson',
        title: 'Mr',
      },
      description: 'Tenant Receipt - Payment Request: Pete Fee request',
      id: 'MKT20000010',
      status: 'posted',
      type: 'paymentRequest',
    },
  })),
)

describe('Payment', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PaymentPage />)).toMatchSnapshot()
  })
})

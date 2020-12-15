import * as React from 'react'
import { shallow } from 'enzyme'
import Payment from '../payment'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
}))

describe('Payment', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Payment />)).toMatchSnapshot()
  })
})

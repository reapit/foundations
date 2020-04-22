import * as React from 'react'
import { shallow } from 'enzyme'
import * as Elements from '@reapit/elements'
import { AddingSourcesAndReferrals, AddingUsers, Branding, GetStated, LetGetStated, Setting } from '../get-started'

const values = {
  current: 'step-1',
  goNext: jest.fn(),
  goPrev: jest.fn(),
  goTo: jest.fn(),
  currentIndex: 0,
  isFirst: true,
  isLast: false,
  steps: [
    {
      id: 'step-1',
      heading: 'Heading-1',
      component: <div>Test</div>,
    },
    {
      id: 'step-2',
      heading: 'Heading-2',
      component: <div>Test</div>,
    },
  ],
  isLoading: false,
}

describe('GetStated', () => {
  it('should match a snapshot', () => {
    expect(shallow(<GetStated />)).toMatchSnapshot()
  })

  it('Setting step should match a snapshot', () => {
    jest.spyOn(Elements as any, 'useHelpGuideContext').mockImplementation(() => ({ ...values }))

    expect(shallow(<Setting />)).toMatchSnapshot()
  })

  it('AddingSourcesAndReferrals step should match a snapshot', () => {
    jest.spyOn(Elements as any, 'useHelpGuideContext').mockImplementation(() => ({ ...values }))

    expect(shallow(<AddingSourcesAndReferrals />)).toMatchSnapshot()
  })

  it('AddingUsers step should match a snapshot', () => {
    jest.spyOn(Elements as any, 'useHelpGuideContext').mockImplementation(() => ({ ...values }))

    expect(shallow(<AddingUsers />)).toMatchSnapshot()
  })

  it('Branding step should match a snapshot', () => {
    jest.spyOn(Elements as any, 'useHelpGuideContext').mockImplementation(() => ({ ...values }))

    expect(shallow(<Branding />)).toMatchSnapshot()
  })

  it('LetGetStated step should match a snapshot', () => {
    jest.spyOn(Elements as any, 'useHelpGuideContext').mockImplementation(() => ({ ...values }))

    expect(shallow(<LetGetStated />)).toMatchSnapshot()
  })
})

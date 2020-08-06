import * as React from 'react'
import { shallow } from 'enzyme'
import * as Elements from '@reapit/elements'
import {
  AddingSourcesAndReferrals,
  AddingUsers,
  Branding,
  Help,
  LetGetStated,
  Setting,
  handleChangeSteps,
} from '../help'

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

describe('Help', () => {
  test('handleChangeSteps', () => {
    const scrollIntoView = jest.fn()
    const spy = jest.spyOn(document, 'getElementById').mockReturnValue(({
      scrollIntoView,
    } as unknown) as HTMLElement)
    const goTo = jest.fn()
    handleChangeSteps(goTo)()
    expect(goTo).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('get-started')
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('should match a snapshot', () => {
    expect(shallow(<Help />)).toMatchSnapshot()
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

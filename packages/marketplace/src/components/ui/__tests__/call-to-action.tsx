import * as React from 'react'
import { render } from '../../../tests/react-testing'
import CallToAction, { CallToActionCardProps } from '../call-to-action'
import { Button } from '@reapit/elements-legacy'

const props: CallToActionCardProps = {
  buttonText: 'My button',
  title: 'My title',
}

describe('CallToAction', () => {
  it('should match a snapshot', () => {
    expect(render(<CallToAction {...props} />)).toMatchSnapshot()
  })

  it('should match snapshot with footerItems', () => {
    const props: CallToActionCardProps = {
      title: 'Test',
      footerItems: (
        <>
          <Button variant="primary" type="button" onClick={jest.fn()}>
            My Apps
          </Button>
          <Button variant="primary" type="button" onClick={jest.fn()}>
            Submit another app
          </Button>
        </>
      ),
    }
    expect(render(<CallToAction {...props} />)).toMatchSnapshot()
  })

  it('should allow custom className', () => {
    const wrapper = render(<CallToAction {...props} className="addition" />)
    expect(wrapper.find('.addition')).toHaveLength(1)
  })

  it('simulates onButtonClick event', () => {
    const mockButtonClick = jest.fn()
    const wrapper = render(<CallToAction {...props} onButtonClick={mockButtonClick} />)
    wrapper.find(Button).simulate('click')
    expect(mockButtonClick).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

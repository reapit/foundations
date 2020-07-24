import { render } from '@testing-library/svelte'
import BookingConfirmationStepThree from '../booking-confirmation-step-three.svelte'

const props = {
  themeClasses: {
    svgNavigation: 'svgNavigation',
    formLabel: 'formLabel',
    formBlock: 'formBlock',
    formInput: 'formInput',
    formHeader: 'formHeader',
    formSeparator: 'formSeparator',
    formButtonPrimary: 'formButtonPrimary',
    formButtonSecondary: 'formButtonSecondary',
    formError: 'formError',
  },
  handlePreviousStep: jest.fn(),
}

describe('FormStep1', () => {
  it('should match snapshot', () => {
    const { container } = render(BookingConfirmationStepThree, props)
    expect(container).toMatchSnapshot()
  })
})

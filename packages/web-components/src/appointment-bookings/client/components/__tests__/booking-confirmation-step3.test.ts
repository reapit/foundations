import { render } from '@testing-library/svelte'
import BookingConfirmationStep3 from '../booking-confirmation-step3.svelte'

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
    const { container } = render(BookingConfirmationStep3, props)
    expect(container).toMatchSnapshot()
  })
})

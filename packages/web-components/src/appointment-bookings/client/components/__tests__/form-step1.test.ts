import { render } from '@testing-library/svelte'
import FormStep1 from '../form-step1.svelte'

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
  handleNextStep: jest.fn(),
  toggleModal: jest.fn(),
}

describe('FormStep1', () => {
  it('should match snapshot', () => {
    const { container } = render(FormStep1, props)
    expect(container).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '../../../tests/react-testing'

const useformMockFunctions = {
  handleSubmit: jest.fn(),
  register: jest.fn(),
  getValues: jest.fn(),
  watch: jest.fn(),
  setError: jest.fn(),
  setValue: jest.fn(),
}

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    ...useformMockFunctions,
    formState: { errors: {} },
  }),
}))

import { FormWizardStep } from '../form-wizard-step'

describe('FormWizardStep', () => {
  it('Should Render Component', async () => {
    const result = render(
      <FormWizardStep
        component={() => <div data-testid="test">I am a test component</div>}
        canGoBack={false}
        isLastStep={false}
        name={'test'}
        onSubmit={() => {}}
        previousStep={() => {}}
      />,
    )

    const component = await result.findByTestId('test')

    expect(component.innerHTML).toBe('I am a test component')
  })

  it('Component should recieve useForm functions', async () => {
    const mockFunction = jest.fn(() => <></>)
    render(
      <FormWizardStep
        component={mockFunction}
        canGoBack={false}
        isLastStep={false}
        name={'test'}
        onSubmit={() => {}}
        previousStep={() => {}}
      />,
    )

    expect(mockFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.objectContaining({}),
        register: useformMockFunctions.register,
        getValues: useformMockFunctions.getValues,
        watch: useformMockFunctions.watch,
        setError: useformMockFunctions.setError,
        setValue: useformMockFunctions.setValue,
      }),
      expect.anything(),
    )
  })

  describe('Previous button will trigger previous function if can go back is true', () => {
    it('can go back is true', async () => {
      const mockFunction = jest.fn()

      const result = render(
        <FormWizardStep
          component={() => {
            return <></>
          }}
          canGoBack={true}
          isLastStep={false}
          name={'test'}
          onSubmit={() => {}}
          previousStep={mockFunction}
        />,
      )

      const previousButton = await result.findByText('Previous')

      previousButton.click()

      expect(mockFunction).toHaveBeenCalled()
    })

    it('Can go back is false', async () => {
      const mockFunction = jest.fn()

      const result = render(
        <FormWizardStep
          component={() => {
            return <></>
          }}
          canGoBack={false}
          isLastStep={false}
          name={'test'}
          onSubmit={() => {}}
          previousStep={mockFunction}
        />,
      )

      const previousButton = await result.findByText('Previous')

      previousButton.click()

      expect(mockFunction).not.toHaveBeenCalled()
    })
  })

  describe('Next/submit button', () => {
    it("Next/submit button should say 'Next' when is not last step", async () => {
      const result = render(
        <FormWizardStep
          component={() => {
            return <></>
          }}
          canGoBack={false}
          isLastStep={false}
          name={'test'}
          onSubmit={() => {}}
          previousStep={() => {}}
        />,
      )

      const nextButton = await result.queryByText('Next')
      const submitButton = await result.queryByText('Submit')

      expect(nextButton).toBeDefined()
      expect(submitButton).toBeNull()
    })

    it("Next/submit button should say 'Submit' when is last step", async () => {
      const result = render(
        <FormWizardStep
          component={() => {
            return <></>
          }}
          canGoBack={false}
          isLastStep={true}
          name={'test'}
          onSubmit={() => {}}
          previousStep={() => {}}
        />,
      )

      const nextButton = await result.queryByText('Next')
      const submitButton = await result.queryByText('Submit')

      expect(nextButton).toBeNull()
      expect(submitButton).toBeDefined()
    })
  })
})

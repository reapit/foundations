import React, { useState } from 'react'
import { render } from '../../../tests/react-testing'
import { Wizard } from '..'

const WizardWrapper = ({ defaultVisible = false }) => {
  const [current, setCurrent] = useState('step-1')
  const [visible, setVisible] = useState(defaultVisible)
  return (
    <div style={{ padding: 20 }}>
      {[1, 2, 3, 4].map((index) => (
        <button
          type="button"
          key={index}
          className={`open-wizard-button-${index}`}
          onClick={() => {
            setCurrent(`step-${index}`)
            setVisible(true)
          }}
        >
          Open step {index}
        </button>
      ))}
      <Wizard
        visible={visible}
        current={current}
        afterClose={() => setVisible(false)}
        leftFooterRender={({ context }) => <div>#{context.currentIndex + 1}</div>}
      >
        <Wizard.Step id="step-1" Component={() => <div className="step-1">Step 1</div>}></Wizard.Step>
        <Wizard.Step id="step-2" Component={() => <div className="step-2">Step 2</div>}></Wizard.Step>
        <Wizard.Step id="step-3" Component={() => <div className="step-3">Step 3</div>}></Wizard.Step>
        <Wizard.Step
          id="step-4"
          Component={() => <div className="step-4">Step 4</div>}
          onSubmit={({ context }) => {
            context.close()
          }}
        ></Wizard.Step>
      </Wizard>
    </div>
  )
}

describe('Wizard', () => {
  it('should be visible when trigger open button click and close when click on cross icon', () => {
    const wrapper = render(<WizardWrapper />)
    wrapper.find('.open-wizard-button-1').first().simulate('click')
    expect(wrapper.find('.modal').hasClass('is-active')).toBeTruthy()
    wrapper.find('.wizard-close').first().simulate('click')
    expect(wrapper.find('.modal').hasClass('is-active')).not.toBeTruthy()
  })

  it('can open nth step pane when open', () => {
    const wrapper = render(<WizardWrapper />)
    Array.from({ length: 4 }, (v, k) => k).forEach((i) => {
      const index = i + 1
      wrapper.find(`.open-wizard-button-${index}`).first().simulate('click')
      expect(wrapper.find(`.step-${index}`)).toHaveLength(1)
      wrapper.find('.wizard-close').first().simulate('click')
    })
  })

  it('Navigate buttons should work/display correctly', () => {
    const wrapper = render(<WizardWrapper defaultVisible />)
    expect(wrapper.find('[data-test="wizard-prev-btn"]')).toHaveLength(0)
    expect(wrapper.find('[data-test="wizard-save-btn"]')).toHaveLength(1)
    expect(wrapper.find('[data-test="wizard-next-btn"]')).toHaveLength(1)

    wrapper.find('[data-test="wizard-next-btn"]').first().simulate('click')

    expect(wrapper.find('.step-2')).toHaveLength(1)

    wrapper.find('[data-test="wizard-next-btn"]').first().simulate('click')

    expect(wrapper.find('.step-2')).toHaveLength(0)
    expect(wrapper.find('.step-3')).toHaveLength(1)

    wrapper.find('[data-test="wizard-next-btn"]').first().simulate('click')

    expect(wrapper.find('.step-4')).toHaveLength(1)
    expect(wrapper.find('[data-test="wizard-prev-btn"]')).toHaveLength(1)
    expect(wrapper.find('[data-test="wizard-save-btn"]')).toHaveLength(0)
    expect(wrapper.find('[data-test="wizard-next-btn"]')).toHaveLength(0)
    expect(wrapper.find('[data-test="wizard-finish-btn"]')).toHaveLength(1)

    wrapper.find('[data-test="wizard-prev-btn"]').first().simulate('click')
    wrapper.find('[data-test="wizard-prev-btn"]').first().simulate('click')
    wrapper.find('[data-test="wizard-prev-btn"]').first().simulate('click')
    expect(wrapper.find('.step-1')).toHaveLength(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

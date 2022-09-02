import React, { useState } from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Input } from '../Input'
import { Button } from '../Button'
import { Wizard, WizardProps } from '.'
import { useWizardContext } from './context'
import { Section } from '@/components/Layout'

export default {
  title: 'Components/Wizard',
  component: Wizard,
}

///////////////////////////////////////////////////////////
// BASIC USAGE
//////////////////////////////////////////////////////////
export const Basic: Story<WizardProps> = () => {
  const [current, setCurrent] = useState('step-1')
  const [visible, setVisible] = useState(false)
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      {[1, 2, 3, 4].map((index) => (
        <Button
          type="button"
          key={index}
          variant="primary"
          className="mr-2"
          onClick={() => {
            setCurrent(`step-${index}`)
            setVisible(true)
          }}
        >
          Open step {index}
        </Button>
      ))}
      <Wizard
        visible={visible}
        current={current}
        afterClose={() => setVisible(false)}
        leftFooterRender={({ context }) => <div>#{context.currentIndex + 1}</div>}
      >
        <Wizard.Step
          onSubmit={({ context }) => context.close()}
          id="step-1"
          Component={() => <div>Step 1</div>}
        ></Wizard.Step>
        <Wizard.Step
          onSubmit={({ context }) => context.close()}
          id="step-2"
          Component={() => <div>Step 2</div>}
        ></Wizard.Step>
        <Wizard.Step
          onSubmit={({ context }) => context.close()}
          id="step-3"
          Component={() => <div>Step 3</div>}
        ></Wizard.Step>
        <Wizard.Step
          id="step-4"
          Component={() => <div>Step 4</div>}
          onSubmit={({ context }) => context.close()}
        ></Wizard.Step>
      </Wizard>
    </Section>
  )
}

///////////////////////////////////////////////////////////
// WORK WITH FORM ELEMENTS
//////////////////////////////////////////////////////////
export const HasForm: Story<WizardProps> = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' })
  const [visible, setVisible] = useState(false)

  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Button onClick={() => setVisible(true)} variant={'primary'} type={'button'}>
        Open
      </Button>
      <Wizard visible={visible} afterClose={() => setVisible(false)}>
        <Wizard.Step<{ firstName: string }>
          id="step-1"
          Component={() => (
            <Input id="form-first-name" name="firstName" placeholder="First name" labelText="First Name" type="text" />
          )}
          initialValue={{ firstName: formData.firstName }}
          validate={(values) => {
            const errors = {} as { firstName: string }
            if (!values.firstName) {
              errors.firstName = 'required'
            }

            return errors
          }}
          onSubmit={({ values, context }) => {
            alert(JSON.stringify(values))
            context.close()
          }}
          onNavigate={async ({ form }) => {
            const values = (form as any).values
            setFormData((prev) => ({ ...prev, ...values }))
            return true
          }}
        ></Wizard.Step>
        <Wizard.Step
          id="step-2"
          Component={() => (
            <Input id="form-last-name" name="lastName" placeholder="Last name" labelText="Last Name" type="text" />
          )}
          onSubmit={({ values, context }) => {
            alert(JSON.stringify(values))
            context.close()
          }}
        ></Wizard.Step>
      </Wizard>
    </Section>
  )
}

///////////////////////////////////////////////////////////
// CUSTOM FOOTER NAVIGATION
//////////////////////////////////////////////////////////
export const CustomNav: Story<WizardProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Button onClick={() => setVisible(true)} variant="primary" type="button">
        Open
      </Button>
      <Wizard
        isLoading={isLoading}
        visible={visible}
        afterClose={() => setVisible(false)}
        rightFooterRender={({ context, form }) => {
          const { steps, currentIndex, isLast } = context
          const onNavigate = steps[currentIndex].onNavigate
          return !isLast ? (
            <Button
              variant="primary"
              type="button"
              loading={isLoading}
              onClick={async () => {
                const errors = await form.validateForm()
                form.setErrors(errors)
                form.setTouched(Object.keys(errors).reduce((a, c) => ({ ...a, [c]: true }), {}))
                if (Object.keys(errors).length === 0) {
                  setIsLoading(true)
                  await (() => new Promise((resolve) => setTimeout(resolve, 2000)))()
                  setIsLoading(false)
                  onNavigate && onNavigate({ context, form, type: 'next' })
                  context.goNext()
                }
              }}
            >
              Next
            </Button>
          ) : null
        }}
      >
        <Wizard.Step<{ formItem: string }>
          id="step-1"
          Component={() => (
            <div>
              <Input
                id="form-item"
                name="formItem"
                placeholder="Required to type something..."
                labelText="Form"
                type="text"
              />
              <p>You can only go next if the item is valid</p>
            </div>
          )}
          initialValue={{ formItem: '' }}
          validate={(values) => {
            const errors = {} as { formItem: string }
            if (!values.formItem) {
              errors.formItem = 'required'
            }

            return errors
          }}
          onSubmit={async ({ context, form }) => {
            const { steps, currentIndex } = context
            const onNavigate = steps[currentIndex].onNavigate
            const errors = await form.validateForm()
            form.setErrors(errors)
            form.setTouched(Object.keys(errors).reduce((a, c) => ({ ...a, [c]: true }), {}))
            if (Object.keys(errors).length === 0) {
              setIsLoading(true)
              await (() => new Promise((resolve) => setTimeout(resolve, 2000)))()
              setIsLoading(false)
              onNavigate && onNavigate({ context, form, type: 'next' })
              context.goNext()
            }
          }}
        ></Wizard.Step>
        <Wizard.Step id="step-2" Component={() => <p>Success message</p>}></Wizard.Step>
      </Wizard>
    </Section>
  )
}

///////////////////////////////////////////////////////////
// ACCESS STATE USING HOOK
//////////////////////////////////////////////////////////

const ComponentOne = () => {
  const { goTo, steps } = useWizardContext()
  return (
    <Button variant="primary" type="button" onClick={() => goTo(steps[2].id)}>
      go to 3
    </Button>
  )
}
const ComponentTwo = () => {
  const { goTo, steps } = useWizardContext()
  return (
    <Button variant="primary" type="button" onClick={() => goTo(steps[3].id)}>
      go to 4
    </Button>
  )
}
const ComponentThree = () => {
  const { goTo, steps } = useWizardContext()
  return (
    <Button variant="primary" type="button" onClick={() => goTo(steps[1].id)}>
      go to 2
    </Button>
  )
}
const ComponentFour = () => {
  const { goTo, steps } = useWizardContext()
  return (
    <Button variant="primary" type="button" onClick={() => goTo(steps[0].id)}>
      go to 1
    </Button>
  )
}

export const HasHook: Story<WizardProps> = () => {
  const [visible, setVisible] = useState(false)
  const close = () => setVisible(false)
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Button variant="primary" type="button" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Wizard
        visible={visible}
        afterClose={() => setVisible(false)}
        leftFooterRender={({ context }) => <div>#{context.currentIndex + 1}</div>}
      >
        <Wizard.Step onSubmit={close} id="step-1" Component={ComponentOne}></Wizard.Step>
        <Wizard.Step onSubmit={close} id="step-2" Component={ComponentTwo}></Wizard.Step>
        <Wizard.Step onSubmit={close} id="step-3" Component={ComponentThree}></Wizard.Step>
        <Wizard.Step onSubmit={close} id="step-4" Component={ComponentFour}></Wizard.Step>
      </Wizard>
    </Section>
  )
}

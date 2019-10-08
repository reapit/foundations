import React, { useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'

import { storiesOf } from '@storybook/react'
import { Wizard } from '.'
import { useWizardContext } from './context'

///////////////////////////////////////////////////////////
// BASIC USAGE
//////////////////////////////////////////////////////////
const BasicUsage = () => {
  const [current, setCurrent] = useState('step-1')
  const [visible, setVisible] = useState(false)
  return (
    <div style={{ padding: 20 }}>
      {[1, 2, 3, 4].map(index => (
        <Button
          type="button"
          key={index}
          variant={'secondary'}
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
        <Wizard.Step id="step-1" Component={() => <div>Step 1</div>}></Wizard.Step>
        <Wizard.Step id="step-2" Component={() => <div>Step 2</div>}></Wizard.Step>
        <Wizard.Step id="step-3" Component={() => <div>Step 3</div>}></Wizard.Step>
        <Wizard.Step
          id="step-4"
          Component={() => <div>Step 4</div>}
          onSubmit={({ context }) => {
            context.close()
          }}
        ></Wizard.Step>
      </Wizard>
    </div>
  )
}
storiesOf('Wizard', module).add('Basic', () => <BasicUsage />)

///////////////////////////////////////////////////////////
// WORK WITH FORM ELEMENTS
//////////////////////////////////////////////////////////
const WorkWithFormElements = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' })

  return (
    <Wizard visible>
      <Wizard.Step<{ firstName: string }>
        id="step-1"
        Component={() => (
          <Input id="form-first-name" name="firstName" placeholder="First name" labelText="First Name" type="text" />
        )}
        initialValue={{ firstName: formData.firstName }}
        validate={values => {
          let errors = {} as { firstName: string }
          if (!values.firstName) {
            errors.firstName = 'required'
          }

          return errors
        }}
        onSubmit={({ values }) => {
          alert(JSON.stringify(values))
        }}
        onNavigate={async ({ form }) => {
          const values = form.values
          setFormData(prev => ({ ...prev, ...values }))
          return true
        }}
      ></Wizard.Step>
      <Wizard.Step
        id="step-2"
        Component={() => (
          <Input id="form-last-name" name="lastName" placeholder="Last name" labelText="Last Name" type="text" />
        )}
      ></Wizard.Step>
    </Wizard>
  )
}
storiesOf('Wizard', module).add('HasForm', () => <WorkWithFormElements />)

///////////////////////////////////////////////////////////
// CUSTOM FOOTER NAVIGATION
//////////////////////////////////////////////////////////
const CustomFooterNavigation = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Wizard
      isLoading={isLoading}
      visible
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
                await (() => new Promise(resolve => setTimeout(resolve, 2000)))()
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
        validate={values => {
          let errors = {} as { formItem: string }
          if (!values.formItem) {
            errors.formItem = 'required'
          }

          return errors
        }}
      ></Wizard.Step>
      <Wizard.Step id="step-2" Component={() => <p>Success message</p>}></Wizard.Step>
    </Wizard>
  )
}
storiesOf('Wizard', module).add('CustomNav', () => <CustomFooterNavigation />)

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

const AccessStateUsingHook = () => {
  return (
    <Wizard visible leftFooterRender={({ context }) => <div>#{context.currentIndex + 1}</div>}>
      <Wizard.Step id="step-1" Component={ComponentOne}></Wizard.Step>
      <Wizard.Step id="step-2" Component={ComponentTwo}></Wizard.Step>
      <Wizard.Step id="step-3" Component={ComponentThree}></Wizard.Step>
      <Wizard.Step id="step-4" Component={ComponentFour}></Wizard.Step>
    </Wizard>
  )
}
storiesOf('Wizard', module).add('HasHook', () => <AccessStateUsingHook />)

import React, { FC, useState, useEffect, MouseEvent, Dispatch, SetStateAction } from 'react'
import dayjs from 'dayjs'
import {
  InputGroup,
  FormLayout,
  InputWrapFull,
  PersistentNotification,
  Subtitle,
  BodyText,
  Button,
  FlexContainer,
  ButtonGroup,
  elMb12,
  useSnack,
  Icon,
  elMb7,
  Select,
  Label,
  InputError,
} from '@reapit/elements'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import TermsAndConditionsModal from './terms-and-conditions-modal'
import Routes from '../../constants/routes'
import { formFields } from './form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  firstStepValidationSchema,
  forthStepValidationSchema,
  secondStepValidationSchema,
  thirdStepValidationSchema,
} from './validation-schema'
import { RegisterContainer, RegisterContentWrapper } from './__styles__'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { createDeveloperService } from '../../services/developer'
import { COUNTRY_OPTIONS } from '../settings/company/country-options-list'
import { StepWizard, useStepWizardContext } from '../step-wizard'
import { useForm } from 'react-hook-form'

const { nameField, emailField, companyNameField, telephoneField, jobTitleField } = formFields

export type DeveloperState = 'LOADING' | 'SUCCESS' | 'ERROR' | 'INITIAL'

export const onSubmit =
  (
    values: Marketplace.CreateDeveloperModel,
    setDeveloperState: Dispatch<SetStateAction<DeveloperState>>,
    error: (message: string, timeout: number) => void,
    stepContext: { goToStep: (step: number) => false | void },
  ) =>
  async () => {
    setDeveloperState('LOADING')
    const response = await createDeveloperService({
      ...values,
      agreedTerms: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
    })
    if (typeof response === 'string') {
      error(response, 5000)
      if (response.includes('email')) {
        stepContext.goToStep(0)
      } else if (response.includes('company')) {
        stepContext.goToStep(1)
      }
      setDeveloperState('ERROR')
    } else {
      setDeveloperState('SUCCESS')
    }
  }

export const onDeclineTermsAndConditions = (setTermsAndConditionsModalVisible: (isVisible: boolean) => void) => () => {
  setTermsAndConditionsModalVisible(false)
}

export const onLoginButtonClick = () => (event: MouseEvent) => {
  event.preventDefault()
  reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
}

export const formSubmit = (setAgreeModalVisable: (val: boolean) => void) => () => {
  setAgreeModalVisable(true)
}

const FirstStepForm: FC<{
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
}> = ({ nextStep, setFormSubmittedData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(firstStepValidationSchema),
    defaultValues: {
      name: '',
      jobTitle: '',
      email: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log('firstForm', values)
        setFormSubmittedData(values)
        nextStep()
      })}
    >
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup
            type="text"
            label={nameField.label as string}
            id={nameField.name}
            placeholder={nameField.placeHolder}
            {...register('name')}
            errorMessage={errors?.name?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label={jobTitleField.label as string}
            id={jobTitleField.name}
            placeholder={jobTitleField.placeHolder}
            {...register('jobTitle')}
            errorMessage={errors?.jobTitle?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="email"
            label={emailField.label as string}
            id={emailField.name}
            placeholder={emailField.placeHolder}
            {...register('email')}
            errorMessage={errors?.email?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup>
            <Button disabled={true}>Previous</Button>
            <Button intent={'primary'}>Next</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}

const SecondStepForm: FC<{
  previousStep: () => void
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
}> = ({ previousStep, nextStep, setFormSubmittedData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(secondStepValidationSchema),
    defaultValues: {
      companyName: '',
      telephone: '',
      website: '',
      registrationNumber: '',
      taxNumber: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log('second values', values)
        setFormSubmittedData(values)
        nextStep()
      })}
    >
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup
            type="text"
            label={companyNameField.label as string}
            id={companyNameField.name}
            placeholder={companyNameField.placeHolder}
            {...register('companyName')}
            errorMessage={errors?.companyName?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="tel"
            label={telephoneField.label as string}
            id={telephoneField.name}
            placeholder={telephoneField.placeHolder}
            {...register('telephone')}
            errorMessage={errors?.telephone?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Website"
            id="website"
            placeholder="mycompany.co.uk"
            {...register('website')}
            errorMessage={errors?.website?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Registration Number"
            id="registration-number"
            placeholder=""
            {...register('registrationNumber')}
            errorMessage={errors['registrationNumber']?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="VAT Number"
            id="vat-number"
            placeholder=""
            {...register('taxNumber')}
            errorMessage={errors['taxNumber']?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup>
            <Button
              onClick={(event) => {
                event.preventDefault()

                previousStep()
              }}
            >
              Previous
            </Button>
            <Button intent={'primary'}>Next</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}

const ThirdStepForm: FC<{
  previousStep: () => void
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
}> = ({ previousStep, nextStep, setFormSubmittedData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(thirdStepValidationSchema),
    defaultValues: {
      companyAddress: {
        line1: '',
        line2: '',
        countryId: 'GB',
        postcode: '',
      },
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log('third', values)
        setFormSubmittedData(values)
        nextStep()
      })}
    >
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Address Line 1"
            id="companyAddress.line1"
            placeholder=""
            {...register('companyAddress.line1')}
            intent={errors.companyAddress?.line1?.message ? 'danger' : undefined}
            errorMessage={errors.companyAddress?.line1?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Address Line 2"
            id="companyAddress.line2"
            placeholder=""
            {...register('companyAddress.line2')}
            intent={errors.companyAddress?.line2?.message ? 'danger' : undefined}
            errorMessage={errors.companyAddress?.line2?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup>
            <Select {...register('companyAddress.countryId')}>
              {COUNTRY_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <Label>Country</Label>
            {errors.companyAddress?.countryId && errors.companyAddress.countryId.message && (
              <InputError message={errors.companyAddress?.countryId.message} />
            )}
          </InputGroup>
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Post Code"
            id="companyAddress.postcode"
            placeholder=""
            {...register('companyAddress.postcode')}
            intent={errors.companyAddress?.postcode?.message ? 'danger' : undefined}
            errorMessage={errors.companyAddress?.postcode?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup>
            <Button
              onClick={(event) => {
                event.preventDefault()

                previousStep()
              }}
            >
              Previous
            </Button>
            <Button intent={'primary'}>Next</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}

const ForthStepForm: FC<{
  previousStep: () => void
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
  submitForm: () => void
}> = ({ previousStep, setFormSubmittedData, submitForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(forthStepValidationSchema),
    defaultValues: {
      notificationsEmail: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log('forth form', values)
        setFormSubmittedData(values)
        submitForm()
      })}
    >
      <FormLayout hasMargin>
        <InputWrapFull>
          <BodyText hasGreyText>
            Holly to provide helper text, this is to be provided by Holly, Holly is the best and will provide us with
            helper text for notification email fields.
          </BodyText>
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="email"
            label="Notification Email"
            id="notification-email"
            placeholder="notifications@mycompany.co.uk"
            {...register('notificationsEmail')}
            intent={errors['notificationsEmail']?.message ? 'danger' : undefined}
            errorMessage={errors['notificationsEmail']?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup>
            <Button
              onClick={(event) => {
                event.preventDefault()
                previousStep()
              }}
            >
              Previous
            </Button>
            <Button intent={'primary'}>Register</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}

export const Register: FC = () => {
  const [agreeModalVisable, setAgreeModalVisable] = useState<boolean>(false)
  const [developerState, setDeveloperState] = useState<DeveloperState>('INITIAL')
  const { error } = useSnack()
  const [formSubmittedData, setFormSubmittedData] = useState<any>()

  const stepContext = useStepWizardContext()

  console.log('values', formSubmittedData)

  useEffect(() => {
    if (developerState === 'SUCCESS' || developerState === 'ERROR') {
      setAgreeModalVisable(false)
    }
  }, [developerState])

  return (
    <RegisterContainer>
      <RegisterContentWrapper>
        <Icon className={elMb7} height="40px" width="200px" icon="reapitLogo" />
        <FlexContainer isFlexColumn>
          <Subtitle hasNoMargin hasCenteredText>
            Register
          </Subtitle>
          <BodyText hasCenteredText>for Reapit Foundations DeveloperPortal</BodyText>
        </FlexContainer>
        {developerState === 'SUCCESS' ? (
          <>
            <PersistentNotification className={elMb12} intent="success" isExpanded isFullWidth isInline>
              Successfully registered, if you already have a Reapit Connect account, please now login. If you do not,
              please check your email to confirm your account.
            </PersistentNotification>
            <ButtonGroup alignment="center" className={elMb12}>
              <Button onClick={onLoginButtonClick()} intent="primary">
                Login With Reapit
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <div style={{ width: '100%' }}>
              <StepWizard stepsClickable={false} activeStep={stepContext.currentStep} gotToStep={stepContext.goToStep}>
                <FirstStepForm
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                />
                <SecondStepForm
                  previousStep={stepContext.previousStep}
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                />
                <ThirdStepForm
                  previousStep={stepContext.previousStep}
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                />
                <ForthStepForm
                  previousStep={stepContext.previousStep}
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                  submitForm={() => {
                    setAgreeModalVisable(true)
                  }}
                />
              </StepWizard>
            </div>
            <TermsAndConditionsModal
              visible={agreeModalVisable}
              onAccept={onSubmit(formSubmittedData, setDeveloperState, error, stepContext)}
              onDecline={onDeclineTermsAndConditions(setAgreeModalVisable)}
              isSubmitting={developerState === 'LOADING'}
            />
          </>
        )}
      </RegisterContentWrapper>
    </RegisterContainer>
  )
}

export default Register

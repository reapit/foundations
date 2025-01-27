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
import { LoginContainer, LoginContentWrapper } from '../login/__styles__'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { createDeveloperService } from '../../services/developer'
import { FormWizard } from '../form-wizard'
import { COUNTRY_OPTIONS } from '../settings/company/country-options-list'

const { nameField, emailField, companyNameField, telephoneField, jobTitleField } = formFields

export type DeveloperState = 'LOADING' | 'SUCCESS' | 'ERROR' | 'INITIAL'

export const registerFormInitialValues: Marketplace.CreateDeveloperModel = {
  name: '',
  companyName: '',
  email: '',
  notificationsEmail: '',
  companyAddress: {
    line1: '',
    line2: '',
    postcode: '',
  },
  telephone: '',
  agreedTerms: '',
  taxNumber: '',
  website: '',
  registrationNumber: '',
}

export const onSubmit =
  (
    values: Marketplace.CreateDeveloperModel,
    setDeveloperState: Dispatch<SetStateAction<DeveloperState>>,
    error: (message: string, timeout: number) => void,
  ) =>
  async () => {
    setDeveloperState('LOADING')
    const response = await createDeveloperService({
      ...values,
      agreedTerms: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
    })
    if (typeof response === 'string') {
      error(response, 5000)
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

export const Register: FC = () => {
  const [agreeModalVisable, setAgreeModalVisable] = useState<boolean>(false)
  const [developerState, setDeveloperState] = useState<DeveloperState>('INITIAL')
  const { error } = useSnack()
  const [formSubmittedData, setFormSubmittedData] = useState<any>()

  useEffect(() => {
    if (developerState === 'SUCCESS' || developerState === 'ERROR') {
      setAgreeModalVisable(false)
    }
  }, [developerState])

  return (
    <LoginContainer>
      <LoginContentWrapper>
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
            <FormWizard
              onSubmit={({ values }) => {
                setFormSubmittedData(values)
                setAgreeModalVisable(true)
              }}
              isSubmitting={developerState === 'LOADING'}
              steps={{
                first: {
                  formOptions: {
                    resolver: yupResolver(firstStepValidationSchema),
                    defaultValues: registerFormInitialValues,
                  },
                  name: '1',
                  component: ({ register, errors }) => (
                    <FormLayout hasMargin>
                      <InputWrapFull>
                        <InputGroup
                          type="text"
                          label={nameField.label as string}
                          id={nameField.name}
                          placeholder={nameField.placeHolder}
                          {...register('name')}
                          intent={errors?.name?.message ? 'danger' : undefined}
                          inputAddOnText={errors?.name?.message}
                        />
                      </InputWrapFull>
                      <InputWrapFull>
                        <InputGroup
                          type="text"
                          label={jobTitleField.label as string}
                          id={jobTitleField.name}
                          placeholder={jobTitleField.placeHolder}
                          {...register('jobtitle')}
                          intent={errors?.jobtitle?.message ? 'danger' : undefined}
                          inputAddOnText={errors?.jobtitle?.message}
                        />
                      </InputWrapFull>
                      <InputWrapFull>
                        <InputGroup
                          type="email"
                          label={emailField.label as string}
                          id={emailField.name}
                          placeholder={emailField.placeHolder}
                          {...register('email')}
                          intent={errors?.email?.message ? 'danger' : undefined}
                          inputAddOnText={errors?.email?.message}
                        />
                      </InputWrapFull>
                    </FormLayout>
                  ),
                },
                second: {
                  name: '2',
                  formOptions: {
                    resolver: yupResolver(secondStepValidationSchema),
                    defaultValues: registerFormInitialValues,
                  },
                  component: ({ register, errors }) => (
                    <FormLayout hasMargin>
                      <InputWrapFull>
                        <InputGroup
                          type="text"
                          label={companyNameField.label as string}
                          id={companyNameField.name}
                          placeholder={companyNameField.placeHolder}
                          {...register('companyName')}
                          intent={errors?.companyName?.message ? 'danger' : undefined}
                          inputAddOnText={errors?.companyName?.message}
                        />
                      </InputWrapFull>
                      <InputWrapFull>
                        <InputGroup
                          type="tel"
                          label={telephoneField.label as string}
                          id={telephoneField.name}
                          placeholder={telephoneField.placeHolder}
                          {...register('telephone')}
                          intent={errors?.telephone?.message ? 'danger' : undefined}
                          inputAddOnText={errors?.telephone?.message}
                        />
                      </InputWrapFull>
                      <InputWrapFull>
                        <InputGroup
                          type="text"
                          label="Website"
                          id="website"
                          placeholder="mycompany.co.uk"
                          {...register('website')}
                          intent={errors?.website?.message ? 'danger' : undefined}
                          inputAddOnText={errors?.website?.message}
                        />
                      </InputWrapFull>
                      <InputWrapFull>
                        <InputGroup
                          type="text"
                          label="Registration Number"
                          id="registration-number"
                          placeholder=""
                          {...register('registrationNumber')}
                          intent={errors['registrationNumber']?.message ? 'danger' : undefined}
                          inputAddOnText={errors['registrationNumber']?.message}
                        />
                      </InputWrapFull>
                      <InputWrapFull>
                        <InputGroup
                          type="text"
                          label="VAT Number"
                          id="vat-number"
                          placeholder=""
                          {...register('taxNumber')}
                          intent={errors['taxNumber']?.message ? 'danger' : undefined}
                          inputAddOnText={errors['taxNumber']?.message}
                        />
                      </InputWrapFull>
                    </FormLayout>
                  ),
                },
                third: {
                  name: '3',
                  formOptions: {
                    resolver: yupResolver(thirdStepValidationSchema),
                    defaultValues: registerFormInitialValues,
                  },
                  component: ({ errors, register }) => (
                    <FormLayout hasMargin>
                      <InputWrapFull>
                        <InputGroup
                          type="text"
                          label="Address Line 1"
                          id="companyAddress.line1"
                          placeholder=""
                          {...register('companyAddress.line1')}
                          intent={errors.companyAddress?.line1?.message ? 'danger' : undefined}
                          inputAddOnText={errors.companyAddress?.line1?.message}
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
                          inputAddOnText={errors.companyAddress?.line2?.message}
                        />
                      </InputWrapFull>
                      <InputWrapFull>
                        <InputGroup>
                          <Select {...register('companyAddress.country')}>
                            {COUNTRY_OPTIONS.map(({ label, value }) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </Select>
                          <Label>Country</Label>
                          {errors.companyAddress?.country && <InputError message={errors.companyAddress?.country} />}
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
                          inputAddOnText={errors.companyAddress?.postcode?.message}
                        />
                      </InputWrapFull>
                    </FormLayout>
                  ),
                },
                forth: {
                  name: '4',
                  formOptions: {
                    resolver: yupResolver(forthStepValidationSchema),
                    defaultValues: registerFormInitialValues,
                  },
                  component: ({ register, errors, getValues }) => (
                    <FormLayout hasMargin>
                      <InputWrapFull>
                        <BodyText hasGreyText>
                          Holly to provide helper text, this is to be provided by Holly, Holly is the best and will
                          provide us with helper text for notification email fields.
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
                          inputAddOnText={errors['notificationsEmail']?.message}
                        />
                      </InputWrapFull>
                    </FormLayout>
                  ),
                },
              }}
            />
            <TermsAndConditionsModal
              visible={agreeModalVisable}
              onAccept={onSubmit(formSubmittedData, setDeveloperState, error)}
              onDecline={onDeclineTermsAndConditions(setAgreeModalVisable)}
              isSubmitting={developerState === 'LOADING'}
            />
          </>
        )}
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default Register

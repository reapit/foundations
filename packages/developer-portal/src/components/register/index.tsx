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
} from '@reapit/elements'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import TermsAndConditionsModal from './terms-and-conditions-modal'
import Routes from '../../constants/routes'
import { formFields } from './form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './validation-schema'
import { useForm, UseFormGetValues } from 'react-hook-form'
import { LoginContainer, LoginContentWrapper } from '../login/__styles__'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { createDeveloperService } from '../../services/developer'

const { nameField, emailField, companyNameField, telephoneField, gitHubUsernameField } = formFields

export type DeveloperState = 'LOADING' | 'SUCCESS' | 'ERROR' | 'INITIAL'

export const registerFormInitialValues: CreateDeveloperModel = {
  name: '',
  companyName: '',
  email: '',
  telephone: '',
  agreedTerms: '',
  gitHubUsername: '',
}

export const onSubmit =
  (
    values: CreateDeveloperModel,
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

export const formChange =
  ({
    getValues,
    errors,
    formStep,
    setFormStep,
  }: {
    getValues: UseFormGetValues<CreateDeveloperModel>
    errors: { [s: string]: any }
    setFormStep: (value: 1 | 2 | 3) => void
    formStep: number
  }) =>
  () => {
    const { name, telephone } = getValues()

    if (name && !errors.name && formStep != 3) {
      if (telephone && !errors.telephone) {
        setFormStep(3)
      } else setFormStep(2)
    }
  }

export const Register: FC = () => {
  const [agreeModalVisable, setAgreeModalVisable] = useState<boolean>(false)
  const [developerState, setDeveloperState] = useState<DeveloperState>('INITIAL')
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1)
  const { error } = useSnack()
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm<CreateDeveloperModel>({
    resolver: yupResolver(validationSchema),
    defaultValues: registerFormInitialValues,
  })

  useEffect(() => {
    if (developerState === 'SUCCESS' || developerState === 'ERROR') {
      setAgreeModalVisable(false)
    }
  }, [developerState])

  return (
    <LoginContainer>
      <LoginContentWrapper>
        <Icon className={elMb7} height="40px" width="200px" icon="reapitLogoInfographic" />
        <FlexContainer isFlexColumn>
          <Subtitle hasNoMargin hasCenteredText>
            Register
          </Subtitle>
          <BodyText hasCenteredText>for Reapit Foundations Developer Portal</BodyText>
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
            <form
              onSubmit={handleSubmit(formSubmit(setAgreeModalVisable))}
              onChange={formChange({
                getValues,
                errors,
                formStep,
                setFormStep,
              })}
            >
              <BodyText hasGreyText hasCenteredText hasSectionMargin>
                By registering for the Foundations platform, you will get access to the Reapit developer portal and
                sandbox data. You will also get the opportunity to list apps in the Reapit Marketplace. We look forward
                to seeing what you build!
              </BodyText>
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
                    type="email"
                    label={emailField.label as string}
                    id={emailField.name}
                    placeholder={emailField.placeHolder}
                    {...register('email')}
                    intent={errors?.email?.message ? 'danger' : undefined}
                    inputAddOnText={errors?.email?.message}
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
                    type="tel"
                    label={gitHubUsernameField.label as string}
                    id={gitHubUsernameField.name}
                    placeholder={gitHubUsernameField.placeHolder}
                    {...register('gitHubUsername')}
                    intent={errors?.gitHubUsername?.message ? 'danger' : undefined}
                    inputAddOnText={errors?.gitHubUsername?.message}
                  />
                </InputWrapFull>
              </FormLayout>
              <TermsAndConditionsModal
                visible={agreeModalVisable}
                onAccept={onSubmit(getValues(), setDeveloperState, error)}
                onDecline={onDeclineTermsAndConditions(setAgreeModalVisable)}
                isSubmitting={developerState === 'LOADING'}
              />
              <ButtonGroup alignment="center">
                <Button type="submit" loading={developerState === 'LOADING'} intent="primary">
                  Register
                </Button>
              </ButtonGroup>
            </form>
          </>
        )}
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default Register

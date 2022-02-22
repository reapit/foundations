import React, { FC, useState, useEffect, MouseEvent } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'
import {
  InputGroup,
  FormLayout,
  InputWrapFull,
  PersistantNotification,
  Title,
  Subtitle,
  BodyText,
  Button,
  FlexContainer,
  useSnack,
  ButtonGroup,
  elMb12,
} from '@reapit/elements'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectDeveloperFormState } from '../../../selector'
import { developerCreate, developerSetFormState } from '../../../actions/developer'
import TermsAndConditionsModal from '../../ui/terms-and-conditions-modal'
import Routes from '../../../constants/routes'
import { formFields } from './form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './validation-schema'
import { KeyAnimation } from '@reapit/utils-react'
import { useForm, UseFormGetValues } from 'react-hook-form'
import reapitLogo from '../../../assets/images/reapit-logo.svg'
import { LoginContainer, LoginImageContainer, LoginContentWrapper } from '../login/__styles__'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

const { nameField, emailField, companyNameField, telephoneField } = formFields

export type RegisterProps = {}

export const registerFormInitialValues: CreateDeveloperModel = {
  name: '',
  companyName: '',
  email: '',
  telephone: '',
  agreedTerms: '',
}

export const onSubmit = (dispatch: Dispatch) => {
  return (values: CreateDeveloperModel) => {
    dispatch(
      developerCreate({
        ...values,
        agreedTerms: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
      }),
    )
  }
}

export const onDeclineTermsAndConditions = (setTermsAndConditionsModalVisible: (isVisible: boolean) => void) => {
  return () => {
    setTermsAndConditionsModalVisible(false)
  }
}

export const onLoginButtonClick = () => (event: MouseEvent) => {
  event.preventDefault()
  reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
}

export const handleSetFormDefault = (dispatch: Dispatch) => () => {
  dispatch(developerSetFormState('PENDING'))
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

export const Register: FC<RegisterProps> = () => {
  const [agreeModalVisable, setAgreeModalVisable] = useState<boolean>(false)
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1)

  const history = useHistory()
  const dispatch = useDispatch()
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
  const formState = useSelector(selectDeveloperFormState)

  useEffect(handleSetFormDefault(dispatch), [history.location.pathname])
  useEffect(() => {
    if (formState === 'ERROR') {
      setAgreeModalVisable(false)
      error('Failed to register')
    }
  }, [formState])
  const isSubmitting = formState === 'SUBMITTING'

  return (
    <LoginContainer>
      <LoginImageContainer>
        <KeyAnimation step={formStep} />
      </LoginImageContainer>
      <LoginContentWrapper>
        <img src={reapitLogo} alt="Reapit Connect Graphic" />
        <FlexContainer isFlexColumn>
          <Title hasNoMargin hasCenteredText>
            Register
          </Title>
          <Subtitle hasCenteredText hasSectionMargin>
            for Reapit Foundations Developer Portal
          </Subtitle>
        </FlexContainer>
        {formState === 'SUCCESS' ? (
          <PersistantNotification intent="success" isExpanded isFullWidth>
            Successfully registered, if you already have a Reapit Connect account, please now login. If you do not,
            please check your email to confirm your account.
          </PersistantNotification>
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
              </FormLayout>
              <TermsAndConditionsModal
                visible={agreeModalVisable}
                afterClose={onDeclineTermsAndConditions(setAgreeModalVisable)}
                onAccept={() => onSubmit(dispatch)(getValues())}
                onDecline={onDeclineTermsAndConditions(setAgreeModalVisable)}
                isSubmitting={isSubmitting}
              />
              <ButtonGroup alignment="center" className={elMb12}>
                <Button onClick={onLoginButtonClick()} intent="primary" size={3}>
                  Login With Reapit
                </Button>
                <Button type="submit" loading={isSubmitting} intent="critical" chevronRight size={3}>
                  Register
                </Button>
              </ButtonGroup>
              <BodyText hasGreyText hasCenteredText>
                {process.env.APP_VERSION}
              </BodyText>
            </form>
          </>
        )}
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default Register

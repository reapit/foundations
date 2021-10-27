import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { History } from 'history'
import dayjs from 'dayjs'
import { Link, useHistory } from 'react-router-dom'
import { Alert } from '@reapit/elements-legacy'
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
  elMt12,
} from '@reapit/elements'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectDeveloperFormState } from '@/selector'
import { developerCreate, developerSetFormState } from '@/actions/developer'
import TermsAndConditionsModal from '@/components/ui/terms-and-conditions-modal'
import Routes from '@/constants/routes'
import { container, imageContainer, wrapper } from './__styles__/register'
import { formFields } from './form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './validation-schema'
import { useEffect } from 'react'
import { KeyAnimation } from '@/components/key-animation'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'

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

export const onLoginButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.LOGIN)
  }
}

export const handleSetFormDefault = (dispatch: Dispatch) => () => {
  dispatch(developerSetFormState('PENDING'))
}

export const Register: React.FunctionComponent<RegisterProps> = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [agreeModalVisable, setAgreeModalVisable] = React.useState<boolean>(false)
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateDeveloperModel>({
    resolver: yupResolver(validationSchema),
    defaultValues: registerFormInitialValues,
  })

  useEffect(handleSetFormDefault(dispatch), [history.location.pathname])
  const formState = useSelector(selectDeveloperFormState)
  console.log('formState', formState)
  useEffect(() => {
    if (formState === 'ERROR') {
      setAgreeModalVisable(false)
    }
  }, [formState])
  const isSubmitting = formState === 'SUBMITTING'

  return (
    <div className={container}>
      <div className={imageContainer}>
        <KeyAnimation step={3} />
      </div>
      <div className={wrapper}>
        <Title>Register</Title>
        <p className="mb-4">Reapit Foundations developers</p>
        {formState === 'SUCCESS' ? (
          <PersistantNotification intent="success">
            Successfully registered. Check your email to confirm your account.
          </PersistantNotification>
        ) : (
          <>
            <form
              onSubmit={handleSubmit((values) => {
                console.log('values', values)
                // TODO set agree modal active
                setAgreeModalVisable(true)
              })}
            >
              <Subtitle>Register for Foundations</Subtitle>
              <BodyText>
                By registering for the Foundations platform, you will get access to the Reapit developer portal and
                sandbox data. You will also get the opportunity to list apps in the Reapit Marketplace. We look forward
                to seeing what you build!
              </BodyText>
              <FormLayout>
                <InputWrapFull>
                  <InputGroup
                    // dataTest="register-name"
                    type="text"
                    label={nameField.label as string}
                    id={nameField.name}
                    placeholder={nameField.placeHolder}
                    {...register('name')}
                    onChange={() => {
                      // TODO check values and set key animation step value
                    }}
                  />
                  {errors?.name?.message && (
                    <PersistantNotification isFullWidth isExpanded intent="danger" isInline>
                      {errors.name.message}
                    </PersistantNotification>
                  )}
                </InputWrapFull>
                <InputWrapFull>
                  <InputGroup
                    // dataTest="register-company-name"
                    type="text"
                    label={companyNameField.label as string}
                    id={companyNameField.name}
                    placeholder={companyNameField.placeHolder}
                    {...register('companyName')}
                    onChange={() => {
                      // TODO check values and set key animation step value
                    }}
                  />
                  {errors?.companyName?.message && (
                    <PersistantNotification isFullWidth isExpanded intent="danger" isInline>
                      {errors.companyName.message}
                    </PersistantNotification>
                  )}
                </InputWrapFull>
                <InputWrapFull>
                  <InputGroup
                    // dataTest="register-email"
                    type="email"
                    label={emailField.label as string}
                    id={emailField.name}
                    placeholder={emailField.placeHolder}
                    {...register('email')}
                    onChange={() => {
                      // TODO check values and set key animation step value
                    }}
                  />
                  {errors?.email?.message && (
                    <PersistantNotification isFullWidth isExpanded intent="danger" isInline>
                      {errors.email.message}
                    </PersistantNotification>
                  )}
                </InputWrapFull>
                <InputWrapFull>
                  <InputGroup
                    // dataTest="register-telephone"
                    type="tel"
                    label={telephoneField.label as string}
                    id={telephoneField.name}
                    placeholder={telephoneField.placeHolder}
                    {...register('telephone')}
                    onChange={() => {
                      // TODO check values and set key animation step value
                    }}
                  />
                  {errors?.telephone?.message && (
                    <PersistantNotification isFullWidth isExpanded intent="danger" isInline>
                      {errors.telephone.message}
                    </PersistantNotification>
                  )}
                </InputWrapFull>
                <InputWrapFull>
                  <TermsAndConditionsModal
                    visible={agreeModalVisable}
                    afterClose={onDeclineTermsAndConditions(setAgreeModalVisable)}
                    // onAccept={handleSubmit}
                    onAccept={() => console.log('agreed')}
                    onDecline={onDeclineTermsAndConditions(setAgreeModalVisable)}
                    isSubmitting={isSubmitting}
                  />
                  <Button intent={'primary'} fullWidth loading={isSubmitting}>
                    Register
                  </Button>
                  <FlexContainer isFlexJustifyBetween className={cx(elMt12)}>
                    <BodyText>Already have an account?</BodyText>
                    <Link to={Routes.LOGIN}>Login</Link>
                  </FlexContainer>
                  {formState === 'ERROR' && (
                    <Alert message="Failed to register" type="danger" dataTest="register-error-message" />
                  )}
                </InputWrapFull>
              </FormLayout>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default Register

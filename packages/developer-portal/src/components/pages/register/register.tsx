import React, { FC, useState, useEffect } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { History } from 'history'
import dayjs from 'dayjs'
import { Link, useHistory } from 'react-router-dom'
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
  useSnack,
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
import { KeyAnimation } from '@reapit/utils-react'
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
    <div className={container}>
      <div className={imageContainer}>
        <KeyAnimation step={formStep} />
      </div>
      <div className={wrapper}>
        <Title>Register</Title>
        <Subtitle hasBoldText hasCenteredText>
          Reapit Foundations Developers
        </Subtitle>
        {formState === 'SUCCESS' ? (
          <PersistantNotification intent="success" isExpanded isFullWidth>
            Successfully registered. Check your email to confirm your account.
          </PersistantNotification>
        ) : (
          <>
            <form
              onSubmit={handleSubmit(() => {
                setAgreeModalVisable(true)
              })}
              onChange={() => {
                const { name, telephone } = getValues()

                if (name && !errors.name && formStep != 3) {
                  if (telephone && !errors.telephone) {
                    setFormStep(3)
                  } else setFormStep(2)
                }
              }}
            >
              <Subtitle>Register for Foundations</Subtitle>
              <BodyText hasGreyText>
                By registering for the Foundations platform, you will get access to the Reapit developer portal and
                sandbox data. You will also get the opportunity to list apps in the Reapit Marketplace. We look forward
                to seeing what you build!
              </BodyText>
              <FormLayout>
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
                  <TermsAndConditionsModal
                    visible={agreeModalVisable}
                    afterClose={onDeclineTermsAndConditions(setAgreeModalVisable)}
                    onAccept={() => onSubmit(dispatch)(getValues())}
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

import * as React from 'react'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import dayjs from 'dayjs'
import {
  Input,
  Button,
  Alert,
  H1,
  Level,
  FormSection,
  FormHeading,
  FormSubHeading,
  Form,
  withFormik,
  FormikProps,
  FormikErrors,
} from '@reapit/elements'
import loginStyles from '@/styles/pages/login.scss?mod'
import { registerValidate } from '@/utils/form/register'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { developerCreate, developerSetFormState } from '../../actions/developer'
import { FormState } from '../../types/core'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import CallToAction from '../ui/call-to-action'
import TermsAndConditionsModal from '../ui/terms-and-conditions-modal'

export interface RegisterMappedActions {
  developerCreate: (developer: CreateDeveloperModel) => void
  developerSetFormState: (formState: FormState) => void
}

export interface RegisterMappedProps {
  formState: FormState
}

export interface RegisterFormValues {
  name: string
  companyName: string
  email: string
  telephone: string
  agreedTerms: string
}

export type RegisterProps = RegisterMappedActions & RegisterMappedProps

const { container, wrapper, disabled, image } = loginStyles

export type HandleOpenModal = (visible: boolean, setVisible: (visible: boolean) => void) => () => void
export const handleOpenModal: HandleOpenModal = (visible, setVisible) => () => {
  setVisible(visible)
}

export const handleChangeAgree = (
  agreedTerms: boolean,
  setAgree: (agreedTerms: boolean) => void,
  setVisible: (visible: boolean) => void,
  handleSubmit: () => void,
) => () => {
  setVisible(false)
  setAgree(agreedTerms)

  if (agreedTerms) {
    handleSubmit()
  }
}

export interface HandleSubmitParams {
  validateForm: () => Promise<FormikErrors<RegisterFormValues>>
  setVisible: (visible: boolean) => void
  handleOpenModal: HandleOpenModal
  handleSubmit: () => void
}
export const handleSubmitButtonOnClick = ({
  handleOpenModal,
  handleSubmit,
  setVisible,
  validateForm,
}: HandleSubmitParams) => () => {
  validateForm().then(errors => {
    if (Object.keys(errors).length > 0) {
      // marked all fields as touched to show errors
      handleSubmit()
      return
    }

    handleOpenModal(true, setVisible)()
  })
}

export const Register: React.FunctionComponent<RegisterProps & FormikProps<RegisterFormValues>> = ({
  formState,
  developerSetFormState,
  errors,
  touched,
  setFieldValue,
  handleSubmit,
  validateForm,
}) => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [agreedTerms, setAgreedTerms] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (agreedTerms) {
      setFieldValue('agreedTerms', dayjs().format('YYYY-MM-DDTHH:mm:ss'))
    } else {
      setFieldValue('agreedTerms', '')
    }
  }, [agreedTerms])

  React.useEffect(() => {
    return () => {
      developerSetFormState('PENDING')
    }
  }, [])

  const isDisabled = formState === 'SUBMITTING'

  return (
    <div className={container}>
      <div className={`${wrapper} ${isDisabled ? disabled : ''}`}>
        <H1 isCentered>Register</H1>
        <p className="pb-8">Reapit Foundations developers</p>
        {formState === 'SUCCESS' ? (
          <CallToAction
            title="Success!"
            buttonText="Login"
            dataTest="register-success-message"
            onButtonClick={() =>
              import('../../core/router').then(router => {
                router.history.push(Routes.DEVELOPER_LOGIN)
              })
            }
            isCenter
          >
            <div className="mb-3">Check your email to confirm your account</div>
          </CallToAction>
        ) : (
          <>
            <Form noValidate={true} data-test="register-form">
              <FormSection>
                <FormHeading>Register for Foundations</FormHeading>
                <FormSubHeading>
                  By registering for the Foundations platform, you will get access to the Reapit developer portal and
                  sandbox data. You will also get the opportunity to list apps in the Reapit Marketplace. We look
                  forward to seeing what you build!
                </FormSubHeading>
                <Input
                  dataTest="register-name"
                  type="text"
                  labelText="Full name"
                  id="name"
                  name="name"
                  placeholder="Joe Developer"
                />
                <Input
                  dataTest="register-company-name"
                  type="text"
                  labelText="Company name"
                  id="companyName"
                  name="companyName"
                  placeholder="Acme Industries Ltd"
                />
                <Input
                  dataTest="register-email"
                  type="email"
                  labelText="Email"
                  id="email"
                  name="email"
                  placeholder="name@address.com"
                />
                <Input
                  dataTest="register-telephone"
                  type="tel"
                  labelText="Telephone"
                  id="telephone"
                  name="telephone"
                  placeholder="0800 800 800"
                />
              </FormSection>
              <FormSection>
                <Level>
                  <TermsAndConditionsModal
                    visible={visible}
                    afterClose={handleOpenModal(false, setVisible)}
                    onAccept={handleChangeAgree(true, setAgreedTerms, setVisible, handleSubmit)}
                    onDecline={handleChangeAgree(false, setAgreedTerms, setVisible, handleSubmit)}
                  />

                  <Button
                    type="button"
                    onClick={handleSubmitButtonOnClick({ validateForm, setVisible, handleOpenModal, handleSubmit })}
                    loading={isDisabled}
                    variant="primary"
                    disabled={isDisabled}
                    fullWidth
                    dataTest="button-register"
                  >
                    Register
                  </Button>
                </Level>
                <Level>
                  Already have an account?<Link to={Routes.DEVELOPER_LOGIN}>Login</Link>
                </Level>
                {formState === 'ERROR' && (
                  <Alert message="Failed to register" type="danger" dataTest="register-error-message" />
                )}
                {touched.agreedTerms && errors.agreedTerms && (
                  <Alert
                    message="Please indicate that you have read and agree to the ‘Terms and Conditions’."
                    type="danger"
                  />
                )}
              </FormSection>
            </Form>
          </>
        )}
      </div>
      <div className={image}>
        <img src={logoImage} alt="Reapit graphic" />
      </div>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): RegisterMappedProps => ({
  formState: state.developer.formState,
})

export const mapDispatchToProps = (dispatch: Dispatch): RegisterMappedActions => ({
  developerCreate: (developer: CreateDeveloperModel) => dispatch(developerCreate(developer)),
  developerSetFormState: (formState: FormState) => dispatch(developerSetFormState(formState)),
})

export const mapPropsToValues = () =>
  ({
    name: '',
    companyName: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    agreedTerms: '',
  } as RegisterFormValues)

export const handleSubmitCreateDeveloper = (values: CreateDeveloperModel, { props }) => {
  props.developerCreate(values)
}

export const enhancedForm = withFormik<RegisterProps, RegisterFormValues>({
  mapPropsToValues: mapPropsToValues,
  validate: registerValidate,
  handleSubmit: handleSubmitCreateDeveloper,
})

export const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, enhancedForm)(Register)

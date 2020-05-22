import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { History } from 'history'
import dayjs from 'dayjs'
import { Link, useHistory } from 'react-router-dom'
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
  FormikErrors,
  Formik,
  FormikTouched,
  DATE_TIME_FORMAT,
} from '@reapit/elements'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectDeveloperFormState } from '@/selector'
import { developerCreate } from '@/actions/developer'
import { registerValidate } from '@/utils/form/register'
import CallToAction from '@/components/ui/call-to-action'
import TermsAndConditionsModal from '@/components/ui/terms-and-conditions-modal'
import Routes from '@/constants/routes'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
const { container, wrapper, image } = loginStyles

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
        agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
      }),
    )
  }
}

export const onRegisterButtonClick = (
  validateForm: (values?: any) => Promise<FormikErrors<CreateDeveloperModel>>,
  setTermsAndConditionsModalVisible: (isVisible: boolean) => void,
  setTouched: (touched: FormikTouched<CreateDeveloperModel>, shouldValidate?: boolean | undefined) => void,
) => {
  return async () => {
    // Set fields touched to show errors
    setTouched({
      companyName: true,
      email: true,
      name: true,
      telephone: true,
    })
    const formError = await validateForm()
    if (Object.keys(formError).length === 0) {
      setTermsAndConditionsModalVisible(true)
    }
  }
}

export const onDeclineTermsAndConditions = (setTermsAndConditionsModalVisible: (isVisible: boolean) => void) => {
  return () => {
    setTermsAndConditionsModalVisible(false)
  }
}

export const onLoginButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.DEVELOPER_LOGIN)
  }
}

export const Register: React.FunctionComponent<RegisterProps> = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState<boolean>(false)
  const formState = useSelector(selectDeveloperFormState)
  const isSubmitting = formState === 'SUBMITTING'

  return (
    <div className={container}>
      <div className={wrapper}>
        <H1 isCentered>Register</H1>
        <p className="pb-8">Reapit Foundations developers</p>
        {formState === 'SUCCESS' ? (
          <CallToAction
            title="Success!"
            buttonText="Login"
            dataTest="register-success-message"
            onButtonClick={onLoginButtonClick(history)}
            isCenter
          >
            <div className="mb-3">Check your email to confirm your account</div>
          </CallToAction>
        ) : (
          <>
            <Formik initialValues={registerFormInitialValues} validate={registerValidate} onSubmit={onSubmit(dispatch)}>
              {formikProps => {
                const { handleSubmit, validateForm, setTouched } = formikProps
                return (
                  <Form noValidate={true} data-test="register-form">
                    <FormSection>
                      <FormHeading>Register for Foundations</FormHeading>
                      <FormSubHeading>
                        By registering for the Foundations platform, you will get access to the Reapit developer portal
                        and sandbox data. You will also get the opportunity to list apps in the Reapit Marketplace. We
                        look forward to seeing what you build!
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
                          afterClose={onDeclineTermsAndConditions(setVisible)}
                          onAccept={handleSubmit}
                          onDecline={onDeclineTermsAndConditions(setVisible)}
                          isSubmitting={isSubmitting}
                        />
                        <Button
                          onClick={onRegisterButtonClick(validateForm, setVisible, setTouched)}
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
                    </FormSection>
                  </Form>
                )
              }}
            </Formik>
          </>
        )}
      </div>
      <div className={image}>
        <img src={logoImage} alt="Reapit graphic" />
      </div>
    </div>
  )
}

export default Register

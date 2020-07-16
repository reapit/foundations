import * as React from 'react'
import { Dispatch } from 'redux'
import { Loader } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { updateDeveloperData } from '@/actions/settings'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '@/selector/settings'
import {
  FormSection,
  Form,
  Grid,
  GridItem,
  Formik,
  LevelRight,
  Button,
  FormHeading,
  FormSubHeading,
  H3,
} from '@reapit/elements'
import ReapitReferenceSection from './reapit-reference-section'
import DirectDebitSection from './direct-debit-section'
import ContactInformationSection from './contact-information-section'
import AccountStatusSection from './account-status-section'
import { UpdateDeveloperModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { validationSchema } from './form-schema/validation-schema'

export type AccountsInformationFormProps = {}

export type AccountsInformationFormValues = {
  hasReapitAccountsRef: string
  hasDirectDebit: string
} & Pick<UpdateDeveloperModel, 'billingEmail' | 'billingKeyContact' | 'billingTelephone' | 'reapitReference' | 'status'>

export const defaultInitialValues: AccountsInformationFormValues = {
  hasReapitAccountsRef: 'no',
  hasDirectDebit: 'no',
  status: 'incomplete',
  billingEmail: '',
  reapitReference: '',
  billingTelephone: '',
  billingKeyContact: '',
}

export const generateInitialValues = ({
  defaultInitialValues,
  developerInfo,
}: {
  defaultInitialValues: AccountsInformationFormValues
  developerInfo: DeveloperModel | null
}): AccountsInformationFormValues => {
  if (!developerInfo) {
    return defaultInitialValues
  }
  const { billingEmail, billingTelephone, billingKeyContact, reapitReference, status } = developerInfo
  const hasReapitAccountsRef = reapitReference ? 'yes' : 'no'
  // if a developer is in "pending" status and has no REAPIT ACCOUNTS REF, it means it has direct debit
  const hasDirectDebit = hasReapitAccountsRef === 'no' && status === 'pending' ? 'yes' : 'no'

  return {
    billingEmail,
    billingTelephone,
    billingKeyContact,
    reapitReference,
    status,
    hasReapitAccountsRef,
    hasDirectDebit,
  }
}
export const ACCOUNT_REF_MIN_LENGTH = 6

export const onSubmit = (dispatch: Dispatch) => (values: AccountsInformationFormValues) => {
  const { status, billingEmail, reapitReference, billingTelephone, billingKeyContact, hasReapitAccountsRef } = values
  const dataToSubmit: UpdateDeveloperModel = {
    status,
    // if user select "NO" in "DO YOU HAVE A REAPIT ACCOUNTS REF?", empty the value
    reapitReference: hasReapitAccountsRef === 'yes' ? reapitReference : '',
    billingEmail,
    billingKeyContact,
    billingTelephone,
  }
  dispatch(updateDeveloperData(dataToSubmit))
}

export type HandleUseEffectParams = {
  dispatch: Dispatch
  isProd: boolean
}

const AccountsInformationForm: React.FC<AccountsInformationFormProps> = () => {
  const isProd = window.reapit.config.appEnv === 'production'
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)
  const isLoading = useSelector(selectSettingsPageIsLoading)

  const dispatch = useDispatch()

  const isShowLoader = isLoading && !isProd
  const [isSubmittedDebit, setIsSubmittedDebit] = React.useState<boolean>(false)

  if (isShowLoader) {
    return <Loader />
  }

  const initialValues = generateInitialValues({ developerInfo, defaultInitialValues })

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit(dispatch)}>
      {({ setFieldValue, values }) => {
        return (
          <Form>
            <H3 isHeadingSection>Billing</H3>
            <FormSection>
              <FormHeading>Accounts Information</FormHeading>
              <FormSubHeading>
                Information required by our accounts team to verify your billing information
              </FormSubHeading>
              <Grid>
                <GridItem>
                  <ContactInformationSection />
                </GridItem>
                <GridItem>
                  <ReapitReferenceSection setFieldValue={setFieldValue} values={values} />
                  <DirectDebitSection
                    setIsSubmittedDebit={setIsSubmittedDebit}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <AccountStatusSection
                    hasReapitAccountsRef={values.hasReapitAccountsRef}
                    isSubmittedDebit={isSubmittedDebit}
                    status={initialValues.status}
                  />
                </GridItem>
              </Grid>
              <LevelRight>
                <div>
                  <LevelRight>
                    <Button className="mb-3" loading={isLoading} dataTest="save-btn" type="submit">
                      Save
                    </Button>
                  </LevelRight>
                </div>
              </LevelRight>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AccountsInformationForm

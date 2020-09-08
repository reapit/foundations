import * as React from 'react'
import { Dispatch } from 'redux'
import { Loader, Helper, H5 } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { updateDeveloperData } from '@/actions/settings'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '@/selector/settings'
import { FormSection, Form, Grid, GridItem, Formik, LevelRight, Button, H3 } from '@reapit/elements'
import ReapitReferenceSection from './reapit-reference-section'
import DirectDebitSection from './direct-debit-section'
import ContactInformationSection from './contact-information-section'
import AccountStatusSection from './account-status-section'
import { UpdateDeveloperModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { validationSchema } from './form-schema/validation-schema'
import { selectIsRequiredDataOfBillingPageFilled } from '@/selector/billing'

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

export const getInitHasReapitAccountsRef = (developerInfo: DeveloperModel) => {
  if (!developerInfo || developerInfo?.status === 'incomplete') {
    return ''
  }

  const hasReapitAccountsRef = developerInfo.reapitReference ? 'yes' : 'no'
  return hasReapitAccountsRef
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
  const hasReapitAccountsRef = getInitHasReapitAccountsRef(developerInfo)
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

export const onSubmit = ({
  dispatch,
  setIsSubmittedDebit,
}: {
  dispatch: Dispatch
  setIsSubmittedDebit: React.Dispatch<React.SetStateAction<boolean>>
}) => (values: AccountsInformationFormValues) => {
  const { status, billingEmail, reapitReference, billingTelephone, billingKeyContact, hasReapitAccountsRef } = values
  const shouldOpenDebit = hasReapitAccountsRef === 'no' && status === 'incomplete'
  if (shouldOpenDebit) {
    window.open(
      `https://reapit.na1.echosign.com/public/esignWidget?wid=${window.reapit.config.debitApiKey}*&hosted=false`,
      '_blank',
    )
  }

  const shouldSetStatusToPending = status !== 'confirmed'

  const dataToSubmit: UpdateDeveloperModel = {
    status: shouldSetStatusToPending ? 'pending' : status,
    // if user select "NO" in "DO YOU HAVE A REAPIT ACCOUNTS REF?", empty the value
    reapitReference: hasReapitAccountsRef === 'yes' ? reapitReference : '',
    billingEmail,
    billingKeyContact,
    billingTelephone,
  }
  setIsSubmittedDebit(false)
  dispatch(updateDeveloperData(dataToSubmit))
}

export type HandleUseEffectParams = {
  dispatch: Dispatch
  isProd: boolean
}

const AccountsInformationForm: React.FC<AccountsInformationFormProps> = () => {
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)
  const isLoading = useSelector(selectSettingsPageIsLoading)

  const isRequiredDataOfBillingPageFilled = useSelector(selectIsRequiredDataOfBillingPageFilled)

  const dispatch = useDispatch()

  const isShowLoader = isLoading
  const [isSubmittedDebit, setIsSubmittedDebit] = React.useState<boolean>(false)

  if (isShowLoader) {
    return <Loader />
  }

  const initialValues = generateInitialValues({ developerInfo, defaultInitialValues })

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit({ dispatch, setIsSubmittedDebit })}
    >
      {({ setFieldValue, values }) => {
        const { hasReapitAccountsRef, status } = values
        const isSubmitDebitButton = hasReapitAccountsRef === 'no' && status === 'incomplete'
        return (
          <Form>
            <H3 isHeadingSection>Billing</H3>
            <FormSection>
              {!isRequiredDataOfBillingPageFilled && (
                <Helper variant="info">
                  You will need to first complete your Organisation information before submitting your Account details
                </Helper>
              )}
              <H5>Accounts Information</H5>

              <p className="is-italic mb-4">
                The following account information is required for your organisation. Your details will be sent to our
                Accounts Department to be verified. You can start subscriptions to services within the Developers Portal
                when your account status has been set to &apos;Confirmed&apos;.
              </p>

              <Grid>
                <GridItem>
                  <ContactInformationSection disabled={!isRequiredDataOfBillingPageFilled} />
                </GridItem>
                <GridItem>
                  <ReapitReferenceSection
                    disabled={!isRequiredDataOfBillingPageFilled}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <DirectDebitSection
                    initialStatus={initialValues.status}
                    isSubmittedDebit={isSubmittedDebit}
                    setIsSubmittedDebit={setIsSubmittedDebit}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <AccountStatusSection
                    hasReapitAccountsRef={values.hasReapitAccountsRef}
                    isSubmittedDebit={isSubmittedDebit}
                    initialStatus={initialValues.status}
                  />
                </GridItem>
              </Grid>
              <LevelRight>
                <div>
                  <LevelRight>
                    <Button className="mb-3" loading={isLoading} dataTest="save-btn" type="submit">
                      {isSubmitDebitButton ? 'SUBMIT TO ACCOUNTS & SETUP DIRECT DEBIT' : 'SUBMIT TO ACCOUNTS'}
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

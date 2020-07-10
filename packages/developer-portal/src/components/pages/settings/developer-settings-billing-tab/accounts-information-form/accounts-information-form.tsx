import * as React from 'react'
import { selectSettingsPageIsLoading } from '@/selector/settings'
import { selectMyIdentity } from '@/selector'
import { Dispatch } from 'redux'
import { fetchMyIdentity } from '@/actions/developer'
import { Loader } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { updateDeveloperData } from '@/actions/settings'
import { selectDeveloperLoading } from '@/selector'
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
import { UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'

export type AccountsInformationFormProps = {}

export type AccountsInformationFormValues = {
  hasReapitAccountsRef: string
  hasDirectDebit: string
} & Pick<UpdateDeveloperModel, 'billingEmail' | 'billingKeyContact' | 'billingTelephone' | 'reapitReference'>

export const initialValues: AccountsInformationFormValues = {
  hasDirectDebit: 'yes',
  hasReapitAccountsRef: '',
}

export const ACCOUNT_REF_MIN_LENGTH = 6

export const onSubmit = (dispatch: Dispatch) => (values: AccountsInformationFormValues) => {
  dispatch(updateDeveloperData(values))
}

export type HandleUseEffectParams = {
  dispatch: Dispatch
  isProd: boolean
}

export const handleUseEffect = ({ dispatch, isProd }: HandleUseEffectParams) => () => {
  if (!isProd) {
    dispatch(fetchMyIdentity())
  }
}

const AccountsInformationForm: React.FC<AccountsInformationFormProps> = () => {
  const isProd = window.reapit.config.appEnv === 'production'
  const isLoading = useSelector(selectDeveloperLoading)
  const myIdentity = useSelector(selectMyIdentity)
  const isSubmitting = useSelector(selectSettingsPageIsLoading)
  const unfetched = !myIdentity || Object.keys(myIdentity).length === 0

  const dispatch = useDispatch()
  React.useEffect(handleUseEffect({ dispatch, isProd }), [])

  const isShowLoader = (isLoading || unfetched) && !isProd
  if (isShowLoader) {
    return <Loader />
  }

  return (
    <Formik initialValues={myIdentity as AccountsInformationFormValues} onSubmit={onSubmit(dispatch)}>
      {({ setFieldValue, values }) => {
        const { hasReapitAccountsRef } = values
        const isEnableSaveBtn = hasReapitAccountsRef === 'yes'

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
                  <DirectDebitSection setFieldValue={setFieldValue} values={values} />
                </GridItem>
              </Grid>
              <LevelRight>
                <Button loading={isSubmitting} dataTest="save-btn" type="submit" disabled={!isEnableSaveBtn}>
                  Save
                </Button>
              </LevelRight>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AccountsInformationForm

import * as React from 'react'
import {
  GridItem,
  FormHeading,
  FormSubHeading,
  Button,
  ModalV2,
  ModalPropsV2,
  H4,
  H6,
  Input,
  LevelRight,
} from '@reapit/elements'
import { AccountsInformationFormValues, ACCOUNT_REF_MIN_LENGTH } from './accounts-information-form'
import formFields from './form-schema/form-fields'
import HelperText from './helper-text'

const { statusField, hasDirectDebitField } = formFields

export type DirectDebitSectionProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  values: AccountsInformationFormValues
  setIsSubmittedDebit: React.Dispatch<React.SetStateAction<boolean>>
  initialStatus?: string
  isSubmittedDebit: boolean
}

type DirectDebitModalProps = Pick<ModalPropsV2, 'onClose' | 'visible'> & {
  onFinish: () => any
}

export const handleToggleModal = (
  setIsOpenDirectDebitModal: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean,
) => () => setIsOpenDirectDebitModal(state)

export const handleFinish = ({
  setIsOpenDirectDebitModal,
  setFieldValue,
  setIsSubmittedDebit,
}: {
  setIsOpenDirectDebitModal: React.Dispatch<React.SetStateAction<boolean>>
  setFieldValue: DirectDebitSectionProps['setFieldValue']
  setIsSubmittedDebit: React.Dispatch<React.SetStateAction<boolean>>
}) => () => {
  setIsOpenDirectDebitModal(false)
  setFieldValue(statusField.name, 'pending')
  setFieldValue(hasDirectDebitField.name, 'yes')
  setIsSubmittedDebit(true)
}

export const DirectDebitModal: React.FC<DirectDebitModalProps> = ({ onClose, visible, onFinish }) => {
  return (
    <ModalV2
      isResponsive
      title={<H4>Foundations Direct Debit</H4>}
      visible={visible}
      onClose={onClose}
      footer={
        <LevelRight className="is-flex">
          <H6 className="mb-0 mr-4">Once you have completed this form, please click here to continue</H6>
          <Button onClick={onFinish}>Finish</Button>
        </LevelRight>
      }
    >
      <iframe
        src={`https://reapit.na1.echosign.com/public/esignWidget?wid=${window.reapit.config.debitApiKey}*&hosted=false`}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0, overflow: 'hidden', minHeight: 500 }}
      />
    </ModalV2>
  )
}

const DirectDebitSection: React.FC<DirectDebitSectionProps> = ({
  values,
  setFieldValue,
  setIsSubmittedDebit,
  isSubmittedDebit,
  initialStatus,
}) => {
  const [isOpenDirectDebitModal, setIsOpenDirectDebitModal] = React.useState<boolean>(false)

  const { hasReapitAccountsRef, reapitReference } = values

  const isInitialStatusPending = initialStatus === 'pending'
  const isInitialStatusIncomplete = initialStatus === 'incomplete'
  const isInnitialStatusInvalid = !(isInitialStatusPending || isInitialStatusIncomplete)
  const shouldHideDebitSection =
    // after submit debit, hide this section
    // when status is pending and hasReapitAccountRef is no -> mean that user already set up debit -> hide this section
    (isInitialStatusPending && hasReapitAccountsRef === 'no') ||
    isSubmittedDebit ||
    // https://github.com/reapit/foundations/issues/1987
    // hide the direct debit section when status is not pending and incomplete
    isInnitialStatusInvalid

  const isShowDirectDebitWithRef =
    hasReapitAccountsRef === 'yes' && (reapitReference || '').length >= ACCOUNT_REF_MIN_LENGTH

  const isShowDirectDebitWithoutRef = hasReapitAccountsRef === 'no'

  if (shouldHideDebitSection) {
    return null
  }

  if (isShowDirectDebitWithRef)
    return (
      <GridItem>
        <FormHeading>Direct Debit</FormHeading>
        <FormSubHeading>
          As you are providing a Reapit Reference, we will need to validate your account with our Accounts Department.
          Once confirmed, any subscriptions will be added to your existing monthly Direct Debit.
        </FormSubHeading>
        <HelperText text="Please now click ‘Submit to Accounts’ to continue" />
      </GridItem>
    )

  if (isShowDirectDebitWithoutRef)
    return (
      <>
        <GridItem>
          <FormHeading>Direct Debit</FormHeading>
          <FormSubHeading>
            You will need to setup a Direct Debit before you can make any subscriptions within the Developers Portal,
            this includes submitting an app for approval and listing an app within the Marketplace. Once completed your
            account will be verified by our Account Department.
          </FormSubHeading>
          <Button onClick={handleToggleModal(setIsOpenDirectDebitModal, true)}>Setup Direct Debit</Button>
          <Input id={hasDirectDebitField.name} type="hidden" name={hasDirectDebitField.name} />
        </GridItem>
        <DirectDebitModal
          visible={isOpenDirectDebitModal}
          onClose={handleToggleModal(setIsOpenDirectDebitModal, false)}
          onFinish={handleFinish({ setIsOpenDirectDebitModal, setFieldValue, setIsSubmittedDebit })}
        />
      </>
    )

  return null
}

export default DirectDebitSection

import React from 'react'
import { Input, Button, SelectBox, SelectBoxOptions, CameraImageInput, Formik, Form } from '@reapit/elements'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DOCUMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel, ContactAddressModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { checkListDetailAddressUpdateData } from '@/actions/checklist-detail'

const optionsMonth = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
] as SelectBoxOptions[]

const MIN_NUMBER_OF_YEARS = 1
const MAX_NUMBER_OF_YEARS = 100

const renderYearOptions = () => {
  let i
  const yearArray: SelectBoxOptions[] = []
  for (i = MIN_NUMBER_OF_YEARS; i <= MAX_NUMBER_OF_YEARS; i++) {
    const year = { label: `${i}`, value: `${i}` } as SelectBoxOptions
    yearArray.push(year)
  }
  return yearArray
}

const optionsDocumentType = [
  { label: 'Please select', value: '' },
  { label: DOCUMENT_TYPE.MORTGATE, value: DOCUMENT_TYPE.MORTGATE },
  { label: DOCUMENT_TYPE.BILL, value: DOCUMENT_TYPE.BILL },
  { label: DOCUMENT_TYPE.TAX_BILL, value: DOCUMENT_TYPE.TAX_BILL },
  { label: DOCUMENT_TYPE.DRIVING_LICENSE, value: DOCUMENT_TYPE.DRIVING_LICENSE },
  { label: DOCUMENT_TYPE.PHOTO_CARD_DRIVING_LICENSE, value: DOCUMENT_TYPE.PHOTO_CARD_DRIVING_LICENSE },
  { label: DOCUMENT_TYPE.INSURANCE_CERTIFICATE, value: DOCUMENT_TYPE.INSURANCE_CERTIFICATE },
  { label: DOCUMENT_TYPE.STATE_PENSION, value: DOCUMENT_TYPE.STATE_PENSION },
  { label: DOCUMENT_TYPE.CURRENT_BENEFIT, value: DOCUMENT_TYPE.CURRENT_BENEFIT },
  { label: DOCUMENT_TYPE.BANK_STATEMENT, value: DOCUMENT_TYPE.BANK_STATEMENT },
  { label: DOCUMENT_TYPE.HOUSE_PURCHASE, value: DOCUMENT_TYPE.HOUSE_PURCHASE },
  { label: DOCUMENT_TYPE.CREDIT_STATEMENT, value: DOCUMENT_TYPE.CREDIT_STATEMENT },
  { label: DOCUMENT_TYPE.TAX_NOTIFICATION, value: DOCUMENT_TYPE.TAX_NOTIFICATION },
  { label: DOCUMENT_TYPE.ACCOUNT_DOCUMENT, value: DOCUMENT_TYPE.ACCOUNT_DOCUMENT },
  { label: DOCUMENT_TYPE.LETTER_FROM_COUNCIL, value: DOCUMENT_TYPE.LETTER_FROM_COUNCIL },
]

export const handleMoreThreeYear = ({ setShowMoreThreeYearInput, isShowMoreThreeYearInput }) => () => {
  setShowMoreThreeYearInput(!isShowMoreThreeYearInput)
}

export type AddressInputProps = {
  addressType: 'primaryAddress' | 'secondaryAddress'
}

export const AddressInput: React.FC<AddressInputProps> = ({ addressType }: AddressInputProps) => {
  return (
    <div>
      <Input type="hidden" labelText="Type" id={`${addressType}[type]`} name={`${addressType}[type]`} />
      <Input
        type="text"
        labelText="Building Name"
        id={`${addressType}[buildingName]`}
        name={`${addressType}[buildingName]`}
      />
      <Input
        type="text"
        labelText="Building Number"
        id={`${addressType}[buildingNumber]`}
        name={`${addressType}[buildingNumber]`}
      />
      <Input type="text" labelText="Line 1" id={`${addressType}[line1]`} name={`${addressType}[line1]`} />
      <Input type="text" labelText="Line 2" id={`${addressType}[line2]`} name={`${addressType}[line2]`} />
      <Input type="text" labelText="Line 3" id={`${addressType}[line3]`} name={`${addressType}[line3]`} />
      <Input type="text" labelText="Line 4" id={`${addressType}[line4]`} name={`${addressType}[line4]`} />
      <Input type="text" labelText="Post Code" id={`${addressType}[postcode]`} name={`${addressType}[postcode]`} />
      <SelectBox
        labelText="Number of Years at Address"
        options={renderYearOptions()}
        id={`metadata.${addressType}[year]`}
        name={`metadata.${addressType}[year]`}
      />
      <SelectBox
        labelText="Number of Months at Address"
        id={`metadata.${addressType}[month]`}
        name={`metadata.${addressType}[month]`}
        options={optionsMonth}
      />
      <SelectBox
        labelText="Document Type"
        id={`metadata.${addressType}[documentType]`}
        name={`metadata.${addressType}[documentType]`}
        options={optionsDocumentType}
      />
      <CameraImageInput
        labelText="Upload file"
        id={`metadata.${addressType}.[documentImage]`}
        name={`metadata.${addressType}.[documentImage]`}
      />
    </div>
  )
}

export const renderForm = ({
  primaryAddress,
  secondaryAddress,
  isSubmitting,
  isShowMoreThreeYearInput,
  setShowMoreThreeYearInput,
}) => () => (
  <Form>
    {primaryAddress && <AddressInput addressType="primaryAddress" />}
    {primaryAddress && !secondaryAddress && (
      <div className={styles.moreThreeYearLink}>
        <a
          data-test="more-three-year"
          onClick={handleMoreThreeYear({ setShowMoreThreeYearInput, isShowMoreThreeYearInput })}
        >
          Less than 3 years?
        </a>
      </div>
    )}
    {(secondaryAddress || isShowMoreThreeYearInput) && <AddressInput addressType="secondaryAddress" />}
    <div className={styles.footerBtn}>
      <Button loading={isSubmitting} className="mr-2" variant="primary" type="submit">
        Save
      </Button>
    </div>
  </Form>
)

export type AddressInformationProps = {
  isSubmitting: boolean
  contact: ContactModel
  onHandleSubmit: (values: any) => void
}

export const AddressInformation: React.FC<AddressInformationProps> = ({
  contact,
  onHandleSubmit,
  isSubmitting,
}: AddressInformationProps) => {
  const [isShowMoreThreeYearInput, setShowMoreThreeYearInput] = React.useState(false)
  return (
    <div>
      <Formik
        initialValues={{
          primaryAddress: contact.primaryAddress || {},
          secondaryAddress: contact.secondaryAddress || {},
          metadata: contact.metadata || {},
        }}
        onSubmit={onHandleSubmit}
      >
        {renderForm({
          primaryAddress: contact.primaryAddress,
          secondaryAddress: contact?.secondaryAddress,
          isShowMoreThreeYearInput,
          setShowMoreThreeYearInput,
          isSubmitting,
        })}
      </Formik>
    </div>
  )
}

export type MappedProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): MappedProps => {
  return {
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    contact: state?.checklistDetail?.checklistDetailData?.contact || {},
  }
}

export type OnHandleSubmitParams = {
  primaryAddress?: ContactAddressModel
  secondaryAddress?: ContactAddressModel
  metadata?: {
    [name: string]: any
  }
}

export type MappedActions = {
  onHandleSubmit: (values: OnHandleSubmitParams) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): MappedActions => {
  return {
    onHandleSubmit: (values: OnHandleSubmitParams) => {
      dispatch(checkListDetailAddressUpdateData(values))
    },
  }
}

export const AddressInformationWithRedux = connect(mapStateToProps, mapDispatchToProps)(AddressInformation)

AddressInformationWithRedux.displayName = 'AddressInformationWithRedux'

export default AddressInformationWithRedux

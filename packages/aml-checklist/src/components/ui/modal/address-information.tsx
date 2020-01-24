import React from 'react'
import { Input, Button, SelectBoxOptions, SelectBox, CameraImageInput, Formik, Form } from '@reapit/elements'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DOCUMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { updateAddressHistory, checklistDetailShowModal } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'

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
  { label: 'Please Select', value: '' },
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

export const AddressInput = ({ addressType }) => {
  // To get/set from metadata
  const addressMetadataIndex = addressType === 'primaryAddress' ? 0 : 1
  return (
    <div key={addressType}>
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
      <Input type="text" labelText="Line 1" required id={`${addressType}[line1]`} name={`${addressType}[line1]`} />
      <Input type="text" labelText="Line 2" id={`${addressType}[line2]`} name={`${addressType}[line2]`} />
      <Input type="text" labelText="Line 3" required id={`${addressType}[line3]`} name={`${addressType}[line3]`} />
      <Input type="text" labelText="Line 4" id={`${addressType}[line4]`} name={`${addressType}[line4]`} />
      <Input
        type="text"
        labelText="Post Code"
        id={`${addressType}[postcode]`}
        name={`${addressType}[postcode]`}
        required
      />
      <SelectBox
        labelText="Number of Years at Address"
        options={renderYearOptions()}
        id={`metadata.addresses[${addressMetadataIndex}][year]`}
        name={`metadata.addresses[${addressMetadataIndex}][year]`}
        required
      />
      <SelectBox
        labelText="Number of Months at Address"
        id={`metadata.addresses[${addressMetadataIndex}][month]`}
        name={`metadata.addresses[${addressMetadataIndex}][month]`}
        options={optionsMonth}
        required
      />
      <SelectBox
        labelText="Document Type"
        id={`metadata.addresses[${addressMetadataIndex}][documentType]`}
        name={`metadata.addresses[${addressMetadataIndex}][documentType]`}
        options={optionsDocumentType}
        required
      />
      <CameraImageInput
        labelText="Upload file"
        id={`metadata.addresses[${addressMetadataIndex}][documentImage]`}
        name={`metadata.addresses[${addressMetadataIndex}][documentImage]`}
        allowClear={true}
        required
      />
    </div>
  )
}

export const renderSencondaryAddress = (secondaryAddress, isShowMoreThreeYearInput, setShowMoreThreeYearInput) => {
  if (secondaryAddress) {
    return <AddressInput addressType="secondaryAddress" />
  }
  if (isShowMoreThreeYearInput) {
    return (
      <>
        <AddressInput addressType="secondaryAddress" />
        <div className={styles.moreThreeYearLink}>
          <a
            data-test="more-three-year"
            onClick={handleMoreThreeYear({ setShowMoreThreeYearInput, isShowMoreThreeYearInput })}
          >
            Less than 3 years?
          </a>
        </div>
      </>
    )
  }
  return (
    <div className={styles.moreThreeYearLink}>
      <a
        data-test="more-three-year"
        onClick={handleMoreThreeYear({ setShowMoreThreeYearInput, isShowMoreThreeYearInput })}
      >
        Less than 3 years?
      </a>
    </div>
  )
}

export const renderForm = ({
  secondaryAddress,
  isSubmitting,
  isShowMoreThreeYearInput,
  setShowMoreThreeYearInput,
  onNextHandler,
  onPrevHandler,
}) => ({ values }) => (
  <Form>
    <AddressInput addressType="primaryAddress" />
    {renderSencondaryAddress(secondaryAddress, isShowMoreThreeYearInput, setShowMoreThreeYearInput)}
    <div className={styles.footerBtn}>
      <Button loading={isSubmitting} className="mr-2" variant="primary" type="submit">
        Save
      </Button>
      <Button disabled={isSubmitting} className="mr-2" variant="primary" type="button" onClick={onPrevHandler}>
        Previous
      </Button>
      <Button disabled={isSubmitting} variant="primary" type="button" onClick={onNextHandler(values)}>
        Next
      </Button>
    </div>
    <p className="is-size-6">* Indicates fields that are required in order to ‘Complete’ this section.</p>
  </Form>
)

export type AddressInformationProps = DispatchProps & StateProps

export const generateMetadata = secondaryAddress => {
  const baseAddressMetadata = {
    year: '',
    month: '',
    documentType: '',
  }

  if (secondaryAddress) {
    return Array(2).fill(baseAddressMetadata)
  }
  return [baseAddressMetadata]
}

export const AddressInformation: React.FC<AddressInformationProps> = ({
  contact,
  onNextHandler,
  onPrevHandler,
  onHandleSubmit,
  isSubmitting,
}) => {
  const [isShowMoreThreeYearInput, setShowMoreThreeYearInput] = React.useState(false)
  const { primaryAddress, secondaryAddress } = contact
  const metadata = contact.metadata || {
    addresses: generateMetadata(secondaryAddress),
  }

  return (
    <div>
      <Formik
        initialValues={{
          primaryAddress,
          secondaryAddress,
          metadata,
        }}
        onSubmit={onHandleSubmit}
      >
        {renderForm({
          secondaryAddress,
          isShowMoreThreeYearInput,
          setShowMoreThreeYearInput,
          onNextHandler,
          onPrevHandler,
          isSubmitting,
        })}
      </Formik>
    </div>
  )
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    contact: state?.checklistDetail?.checklistDetailData?.contact || {},
  }
}

export type DispatchProps = {
  onNextHandler: (values: any) => () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onHandleSubmit: (values: any) => {
      dispatch(updateAddressHistory({ contact: values }))
    },
    onNextHandler: (values: any) => () =>
      dispatch(updateAddressHistory({ nextSection: STEPS.DECLARATION_RISK_MANAGEMENT, contact: values })),
    onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.SECONDARY_IDENTIFICATION)),
  }
}

export const AddressInformationWithRedux = connect(mapStateToProps, mapDispatchToProps)(AddressInformation)

AddressInformationWithRedux.displayName = 'AddressInformationWithRedux'

export default AddressInformationWithRedux

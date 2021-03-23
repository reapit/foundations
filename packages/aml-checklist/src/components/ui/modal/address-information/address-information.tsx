import React from 'react'
import {
  Input,
  Button,
  SelectBoxOptions,
  SelectBox,
  CameraImageInput,
  Formik,
  Form,
  ButtonGroup,
} from '@reapit/elements'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DOCUMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { updateAddressHistory, checklistDetailShowModal } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'
import { formFields } from './form-schema/form-fields'
import validationSchema from './form-schema/validation-schema'

const optionsMonth = [
  { label: '0', value: '0' },
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

const MIN_NUMBER_OF_YEARS = 0
const MAX_NUMBER_OF_YEARS = 100

export const renderYearOptions = () => {
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
  { label: DOCUMENT_TYPE.SMART_SEARCH_CCD_REPORT, value: DOCUMENT_TYPE.SMART_SEARCH_CCD_REPORT },
]

export const handleMoreThreeYear = ({ setShowMoreThreeYearInput, isShowMoreThreeYearInput }) => () => {
  setShowMoreThreeYearInput(!isShowMoreThreeYearInput)
}

export const AddressInput = ({ addressType }) => {
  const fields = formFields(addressType)
  const {
    typeField,
    buildingNameField,
    buildingNumberField,
    line1Field,
    line2Field,
    line3Field,
    line4Field,
    postcodeField,
    yearField,
    monthField,
    documentTypeField,
    documentImageField,
  } = fields

  return (
    <div key={addressType}>
      <Input type="hidden" labelText={typeField.label} id={typeField.name} name={typeField.name} />
      <Input
        type="text"
        labelText={buildingNameField.label}
        id={buildingNameField.name}
        name={buildingNameField.name}
      />
      <Input
        type="text"
        labelText={buildingNumberField.label}
        id={buildingNumberField.name}
        name={buildingNumberField.name}
      />
      <Input type="text" labelText={line1Field.label} required id={line1Field.name} name={line1Field.name} />
      <Input type="text" labelText={line2Field.label} id={line2Field.name} name={line2Field.name} />
      <Input type="text" labelText={line3Field.label} required id={line3Field.name} name={line3Field.name} />
      <Input type="text" labelText={line4Field.label} id={line4Field.name} name={line4Field.name} />
      <Input type="text" labelText={postcodeField.label} id={postcodeField.name} name={postcodeField.name} required />
      <SelectBox
        labelText={yearField.label}
        options={renderYearOptions()}
        id={yearField.name}
        name={yearField.name}
        required
      />
      <SelectBox
        labelText={monthField.label}
        id={monthField.name}
        name={monthField.name}
        options={optionsMonth}
        required
      />
      <SelectBox
        labelText={documentTypeField.label}
        id={documentTypeField.name}
        name={documentTypeField.name}
        options={optionsDocumentType}
        required
      />
      <CameraImageInput
        labelText={documentImageField.label || ''}
        id={documentImageField.name}
        name={documentImageField.name}
        allowClear={true}
        required
        isNarrowWidth
        accept="image/*"
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

export type AddressInformationProps = DispatchProps & StateProps

export const generateMetadata = (secondaryAddress) => {
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
  const { primaryAddress, secondaryAddress, metadata } = contact

  const formatedMetadata = {
    primaryAddress: {
      documentImage: metadata?.primaryAddress?.documentImage || '',
    },
    secondaryAddress: {
      documentImage: metadata?.primaryAddress?.documentImage || '',
    },
    ...metadata,
  }

  return (
    <div>
      <Formik
        validateOnMount
        initialValues={{
          primaryAddress,
          secondaryAddress,
          metadata: formatedMetadata,
        }}
        onSubmit={onHandleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isValid }) => {
          return (
            <Form>
              <AddressInput addressType="primaryAddress" />
              {renderSencondaryAddress(secondaryAddress, isShowMoreThreeYearInput, setShowMoreThreeYearInput)}
              <div className="field pb-2">
                <div className={`columns ${styles.reverseColumns}`}>
                  <ButtonGroup hasSpacing isCentered>
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting || !isValid}
                      className="mr-2"
                      variant="success"
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      className="mr-2"
                      variant="secondary"
                      type="button"
                      onClick={onPrevHandler}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={isSubmitting || !isValid}
                      variant="primary"
                      type="button"
                      onClick={onNextHandler(values)}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <p className="is-size-6">* Indicates fields that are required in order to ‘Complete’ this section.</p>
            </Form>
          )
        }}
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

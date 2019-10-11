import React from 'react'
import { Input, Button, SelectBox, SelectBoxOptions, CameraImageInput } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { oc } from 'ts-optchain'
import { DOCUMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel, AddressModel } from '@/types/contact-api-schema'
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
  { label: '12', value: '12' }
] as SelectBoxOptions[]

const MIN_YEAR = 1900
const MAX_YEAR = 2100

const renderYearOptions = () => {
  let i
  const yearArray: SelectBoxOptions[] = []
  for (i = MIN_YEAR; i <= MAX_YEAR; i++) {
    const year = { label: `${i}`, value: `${i}` } as SelectBoxOptions
    yearArray.push(year)
  }
  return yearArray
}

const optionsDocumentType = [
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
  { label: DOCUMENT_TYPE.LETTER_FROM_COUNCIL, value: DOCUMENT_TYPE.LETTER_FROM_COUNCIL }
]

export const handleMoreThreeYear = ({ setShowMoreThreeYearInput, isShowMoreThreeYearInput }) => () => {
  setShowMoreThreeYearInput(!isShowMoreThreeYearInput)
}

export const AddressInput = ({ index, values, setFieldValue }) => {
  return (
    <div key={index}>
      <Input
        type="text"
        labelText="Type"
        id={`addresses[${index}][type]`}
        name={`addresses[${index}][type]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].type : null}
        onChange={() => setFieldValue(`values.addresses[${index}].type`)}
      />
      <Input
        type="text"
        labelText="Building Name"
        id={`addresses[${index}][buildingName]`}
        name={`addresses[${index}][buildingName]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].buildingName : null}
        onChange={() => setFieldValue(`values.addresses[${index}].buildingName`)}
      />
      <Input
        type="text"
        labelText="Building Number"
        id={`addresses[${index}][buildingNumber]`}
        name={`addresses[${index}][buildingNumber]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].buildingNumber : null}
        onChange={() => setFieldValue(`values.addresses[${index}].buildingNumber`)}
      />
      <Input
        type="text"
        labelText="Line 1"
        id={`addresses[${index}][line1]`}
        name={`addresses[${index}][line1]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line1 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line1`)}
      />
      <Input
        type="text"
        labelText="Line 2"
        id={`addresses[${index}][line2]`}
        name={`addresses[${index}][line2]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line2 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line2`)}
      />
      <Input
        type="text"
        labelText="Line 3"
        id={`addresses[${index}][line3]`}
        name={`addresses[${index}][line3]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line3 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line3`)}
      />
      <Input
        type="text"
        labelText="Line 4"
        id={`addresses[${index}][line4]`}
        name={`addresses[${index}][line4]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line4 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line4`)}
      />
      <Input
        type="text"
        labelText="Post Code"
        id={`addresses[${index}][postcode]`}
        name={`addresses[${index}][postcode]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].postcode : null}
        onChange={() => setFieldValue(`values.addresses[${index}].postcode`)}
      />
      <SelectBox
        labelText="Year"
        options={renderYearOptions()}
        id={`metadata.addresses[${index}][year]`}
        name={`metadata.addresses[${index}][year]`}
        value={
          values.metadata && values.metadata.addresses && values.metadata.addresses[index]
            ? values.metadata.addresses[index].year
            : null
        }
        onChange={() => setFieldValue(`values.metadata.addresses[${index}].year`)}
      />
      <SelectBox
        labelText="Month"
        id={`metadata.addresses[${index}][month]`}
        name={`metadata.addresses[${index}][month]`}
        options={optionsMonth}
        value={
          values.metadata && values.metadata.addresses && values.metadata.addresses[index]
            ? values.metadata.addresses[index].month
            : null
        }
        onChange={() => setFieldValue(`values.metadata.addresses[${index}].month`)}
      />
      <SelectBox
        labelText="Document Type"
        id={`metadata.addresses[${index}][documentType]`}
        name={`metadata.addresses[${index}][documentType]`}
        options={optionsDocumentType}
        value={
          values.metadata && values.metadata.addresses && values.metadata.addresses[index]
            ? values.metadata.addresses[index].documentType
            : null
        }
        onChange={() => setFieldValue(`values.metadata.addresses[${index}].documentType`)}
      />
      <Input
        type="hidden"
        id={`metadata.addresses[${index}][documentImage]`}
        name={`metadata.addresses[${index}][documentImage]`}
        value={
          values.metadata && values.metadata.addresses && values.metadata.addresses[index]
            ? values.metadata.addresses[index].documentImage
            : null
        }
        onChange={() => setFieldValue(`values.metadata.addresses[${index}].documentImage`)}
      />
      <CameraImageInput
        labelText="Upload file/Take a picture"
        id={`metadata.addresses.[${index}][documentFileInput]`}
        name={`metadata.addresses.[${index}][documentFileInput]`}
        value={
          values.metadata && values.metadata.addresses && values.metadata.addresses[index]
            ? values.metadata.addresses[index].documentFileInput
            : null
        }
        onChange={() => setFieldValue(`values.metadata.addresses[${index}].documentFileInput`)}
      />
    </div>
  )
}

export const renderExtraForm = ({ isShowMoreThreeYearInput, values, index, setFieldValue }) => {
  if (isShowMoreThreeYearInput) {
    return (
      <AddressInput data-test="address-input" key={index} index={index} values={values} setFieldValue={setFieldValue} />
    )
  }
}

export const renderForm = ({ addresses, isSubmitting, isShowMoreThreeYearInput, setShowMoreThreeYearInput }) => ({
  values,
  setFieldValue
}) => {
  return (
    <Form>
      {addresses.map((_, index) => {
        return <AddressInput key={index} index={index} values={values} setFieldValue={setFieldValue} />
      })}
      <div className={styles.moreThreeYearLink}>
        <a
          data-test="more-three-year"
          onClick={handleMoreThreeYear({ setShowMoreThreeYearInput, isShowMoreThreeYearInput })}
        >
          More than 3 year?
        </a>
      </div>
      {renderExtraForm({ isShowMoreThreeYearInput, values, setFieldValue, index: addresses.length })}
      <div className={styles.footerBtn}>
        <Button loading={isSubmitting} className="mr-2" variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  )
}

export type AddressInformationProps = {
  isSubmitting: boolean
  contact: ContactModel
  onHandleSubmit: (values: any) => void
}

export const AddressInformation: React.FC<AddressInformationProps> = ({ contact, onHandleSubmit, isSubmitting }) => {
  const [isShowMoreThreeYearInput, setShowMoreThreeYearInput] = React.useState(false)
  return (
    <div>
      <Formik
        initialValues={{
          addresses: contact.addresses || [],
          metadata: contact.metadata || {}
        }}
        onSubmit={onHandleSubmit}
        render={renderForm({
          addresses: contact.addresses,
          isShowMoreThreeYearInput,
          setShowMoreThreeYearInput,
          isSubmitting
        })}
      />
    </div>
  )
}

export type MappedProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): MappedProps => {
  return {
    isSubmitting: oc(state).checklistDetail.isSubmitting(false),
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
  }
}

export type MappedActions = {
  onHandleSubmit: (values: AddressModel[]) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): MappedActions => {
  return {
    onHandleSubmit: (values: any) => {
      dispatch(checkListDetailAddressUpdateData(values))
    }
  }
}

export const AddressInformationWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressInformation)

AddressInformationWithRedux.displayName = 'AddressInformationWithRedux'

export default AddressInformationWithRedux

import React from 'react'
import { Input, Button, SelectBox, SelectBoxOptions, CameraImageInput } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { oc } from 'ts-optchain'
import { combineAdress } from '@/utils/combineAddress'
import { DOCUMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@/types/contact-api-schema'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { checkListDetailShowModal } from '@/actions/checklist-detail'
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

export const renderExtraForm = (isShowMoreThreeYearInput: boolean) =>
  isShowMoreThreeYearInput ? (
    <div>
      <Input type="text" labelText="Address" id="address" name="address" />
      <SelectBox labelText="Year" id="year" name="year" options={renderYearOptions()} />
      <SelectBox labelText="Month" id="month" name="month" options={optionsMonth} />
      <SelectBox labelText="Document Type" id="documentType" name="documentType" options={optionsDocumentType} />
      <CameraImageInput labelText="Upload file/Take a picture" id="documentImage" name="documentImage" />
    </div>
  ) : null

export const renderForm = ({
  address,
  isShowMoreThreeYearInput,
  setShowMoreThreeYearInput,
  onNextHandler,
  onPrevHandler
}) => () => {
  return (
    <div>
      <div className={styles.bold}>Address</div>
      <div>{address}</div>
      <Form>
        <div>
          <SelectBox labelText="Year" id="year" name="year" options={renderYearOptions()} />
          <SelectBox labelText="Month" id="month" name="month" options={optionsMonth} />
          <SelectBox labelText="Document Type" id="documentType" name="documentType" options={optionsDocumentType} />
          <CameraImageInput labelText="Upload file/Take a picture" id="documentImage" name="documentImage" />
        </div>
        <div className={styles.moreThreeYearLink}>
          <a
            data-test="more-three-year"
            onClick={handleMoreThreeYear({ setShowMoreThreeYearInput, isShowMoreThreeYearInput })}
          >
            More than 3 year?
          </a>
        </div>
        {renderExtraForm(isShowMoreThreeYearInput)}
        <div className={styles.footerBtn}>
          <Button className="mr-2" variant="primary" type="submit">
            Submit
          </Button>
          <Button className="mr-2" variant="primary" type="button" onClick={onNextHandler}>
            Next
          </Button>
          <Button variant="primary" type="button" onClick={onPrevHandler}>
            Previous
          </Button>
        </div>
      </Form>
    </div>
  )
}

export type AddressInformationProps = {
  contact: ContactModel
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export const AddressInformation: React.FC<AddressInformationProps> = ({
  contact,
  onNextHandler,
  onPrevHandler,
  onHandleSubmit
}) => {
  const [isShowMoreThreeYearInput, setShowMoreThreeYearInput] = React.useState(false)
  const address = combineAdress(contact.addresses)
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={onHandleSubmit}
        render={renderForm({
          address,
          isShowMoreThreeYearInput,
          setShowMoreThreeYearInput,
          onNextHandler,
          onPrevHandler
        })}
      />
    </div>
  )
}

export type MappedProps = {
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): MappedProps => {
  return {
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
  }
}

export type MappedActions = {
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): MappedActions => {
  return {
    onHandleSubmit: values => {
      console.log(values)
    },
    onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.DECLARATION_RISK_MANAGEMENT)),
    onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.ADDRESS_INFORMATION))
  }
}

export const AddressInformationWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressInformation)

AddressInformationWithRedux.displayName = 'AddressInformationWithRedux'

export default AddressInformationWithRedux

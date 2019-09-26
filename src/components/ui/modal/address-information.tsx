import React from 'react'
import { Input, Button, SelectBox, SelectBoxOptions, CameraImageInput } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { combineAdress } from '@/utils/combineAddress'
import { DOCUMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@/types/contact-api-schema'
import styles from '@/styles/pages/checklist-detail.scss?mod'

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
  loading
  // onNextHandler,
  // onPrevHandler
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
          <Button className="mr-2" variant="primary" type="submit" loading={loading}>
            Submit
          </Button>
          <Button className="mr-2" variant="primary" type="button" disabled={loading}>
            Next
          </Button>
          <Button variant="primary" type="button" disabled={loading}>
            Previous
          </Button>
        </div>
      </Form>
    </div>
  )
}

export type AddressINformationProps = {
  contact: ContactModel
  // onNextHandler: () => void
  // onPrevHandler: () => void
  loading: boolean
}

export const AddressInformation: React.FC<AddressINformationProps> = ({
  contact,
  // onNextHandler,
  // onPrevHandler,
  loading
}) => {
  const [isShowMoreThreeYearInput, setShowMoreThreeYearInput] = React.useState(false)
  const address = combineAdress(contact.addresses)
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={values => {
          console.log(values)
        }}
        render={renderForm({
          address,
          isShowMoreThreeYearInput,
          setShowMoreThreeYearInput,
          // onNextHandler,
          // onPrevHandler,
          loading
        })}
      />
    </div>
  )
}

export default AddressInformation

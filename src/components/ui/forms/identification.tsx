import React from 'react'
import { Formik, Form } from 'formik'
import { ContactModel, IdentityDocumentModel } from '@/types/contact-api-schema'
import { Button, Input, DatePicker, CameraImageInput } from '@reapit/elements'
import SelectIdentity from '@/components/ui/inputs/select-identity'
import styles from '@/styles/pages/identification.scss?mod'
import { oc } from 'ts-optchain'

export const IDENTIFICATION_FORM_DEFAULT_VALUES: IdentityDocumentModel = {
  typeId: '',
  details: '',
  expiry: undefined,
  fileUrl: undefined
}

export type IdentificationProps = {
  contact: ContactModel | null
  initFormValues: IdentityDocumentModel
  loading: boolean
  isDesktopMode: boolean
  onSaveHandler: (values: any) => void
  onNextHandler: (values: any) => () => void
  onPrevHandler: () => void
}

export const renderFormHandler = ({ contact, loading, onNextHandler, onPrevHandler, isDesktopMode }) => ({
  values
}) => {
  const id = oc(contact).id('')
  return (
    <Form>
      <SelectIdentity id="typeId" name="typeId" labelText="ID Type" />
      <Input id="details" name="details" type="text" placeholder="ID Reference" labelText="ID Reference" />
      <DatePicker id="expiry" name="expiry" labelText="Expiry Date" />
      <CameraImageInput
        id="fileUrl"
        name="fileUrl"
        labelText={isDesktopMode ? 'Upload File' : 'Upload File/Take a Pic'}
        allowClear={true}
      />

      <div className={`flex mt-4 ${styles.justifyBetween}`}>
        <div className="flex items-center">
          <span>RPS Ref:</span>
          <span className="ml-1">{id}</span>
        </div>

        <div>
          <Button className="mr-2" variant="primary" type="submit" loading={loading}>
            Save
          </Button>
          <Button className="mr-2" variant="primary" type="button" onClick={onPrevHandler} disabled={loading}>
            Previous
          </Button>
          <Button variant="primary" type="button" onClick={onNextHandler(values)} disabled={loading}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  )
}

export const onSubmitHandler = (formValues: IdentityDocumentModel, onSaveHandler) => onSaveHandler(formValues)

export const Identification: React.FC<IdentificationProps> = ({
  loading,
  contact,
  initFormValues,
  onSaveHandler,
  onNextHandler,
  onPrevHandler,
  isDesktopMode
}) => (
  <Formik
    initialValues={initFormValues}
    onSubmit={(formValues: IdentityDocumentModel) => onSubmitHandler(formValues, onSaveHandler)}
    render={renderFormHandler({ contact, loading, onNextHandler, onPrevHandler, isDesktopMode })}
  />
)

export default Identification

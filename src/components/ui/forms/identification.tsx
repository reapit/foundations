import React from 'react'
import { Formik, Form } from 'formik'
import { ContactModel } from '@/types/contact-api-schema'
import { Button, Input, DatePicker, CameraImageInput } from '@reapit/elements'
import SelectIdentity from '@/components/ui/inputs/select-identity'
import styles from '@/styles/pages/identification.scss?mod'

export type IdentificationFormValues = {
  typeId: string
  details: string
  expiry?: Date
  fileUrl?: string
}

export const IDENTIFICATION_FORM_DEFAULT_VALUES: IdentificationFormValues = {
  typeId: '',
  details: '',
  expiry: undefined,
  fileUrl: undefined
}

export type IdentificationProps = {
  contactModel: ContactModel
  initFormValues: IdentificationFormValues
  loading: boolean
  isDesktopMode: boolean
  onSaveHandler: () => void
}

export const renderFormHandler = ({ contactModel, loading, isDesktopMode }) => () => {
  const { id } = contactModel

  return (
    <Form>
      <SelectIdentity id="typeId" name="typeId" labelText="ID Type" />
      <Input id="details" name="details" type="text" placeholder="ID Reference" labelText="ID Reference" />
      <DatePicker id="expiry" name="expiry" labelText="Expiry Date" />
      <CameraImageInput
        id="fileUrl"
        name="fileUrl"
        labelText={isDesktopMode ? 'Upload file' : 'Upload File/Take a Pic'}
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
        </div>
      </div>
    </Form>
  )
}

export const onSubmitHandler = (formValues: IdentificationFormValues, onSaveHandler) => onSaveHandler(formValues)

export const Identification: React.FC<IdentificationProps> = ({
  loading,
  contactModel,
  initFormValues,
  onSaveHandler,
  isDesktopMode
}) => (
  <Formik
    initialValues={initFormValues}
    onSubmit={(formValues: IdentificationFormValues) => onSubmitHandler(formValues, onSaveHandler)}
    render={renderFormHandler({ contactModel, loading, isDesktopMode })}
  />
)

export default Identification

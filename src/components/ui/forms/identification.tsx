import React from 'react'
import { Formik, Form } from 'formik'
import { ContactModel, IdentityCheckModel } from '@/types/contact-api-schema'
import { Button, Input, FileInput, DatePicker } from '@reapit/elements'
import SelectIdentity from '@/components/ui/inputs/select-identity'

export type IdentificationFormValues = {
  typeId: string
  details: string
  expiry?: Date
  fileUrl?: string
}

export type IdentificationProps = {
  data: ContactModel
  loading: boolean
  onSaveHandler: () => void
  onNextHandler: () => void
  onPrevHandler: () => void
}

export const initialFormValues = {
  typeId: '',
  details: '',
  expiry: undefined,
  fileUrl: undefined
}

export const renderFormHandler = ({ data, loading, onNextHandler, onPrevHandler }) => {
  const { id } = data

  return (
    <Form>
      <SelectIdentity id="typeId" name="typeId" labelText="ID Type" />
      <Input id="details" name="details" type="text" placeholder="ID Reference" labelText="ID Reference" />
      <DatePicker id="expiry" name="expiry" labelText="Expired Date" />
      <FileInput id="fileUrl" name="fileUrl" labelText="Upload File/Take a Pic" />

      <div className="flex justify-between mt-4">
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
          <Button variant="primary" type="button" onClick={onNextHandler} disabled={loading}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  )
}

export const onSubmitHandler = (data: ContactModel, values: IdentificationFormValues, onSaveHandler) => {
  const { id } = data
  const { typeId, expiry, details, fileUrl } = values

  const formatedValues = {
    contactId: id,
    documents: [
      {
        typeId,
        expiry: expiry,
        details,
        fileUrl
      }
    ]
  } as IdentityCheckModel

  onSaveHandler(formatedValues)
}

export const Identification: React.FC<IdentificationProps> = ({
  loading,
  data,
  onSaveHandler,
  onNextHandler,
  onPrevHandler
}) => {
  const initialValues = data ? initialFormValues : initialFormValues

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: IdentificationFormValues) => onSubmitHandler(data, values, onSaveHandler)}
      render={() => renderFormHandler({ data, loading, onNextHandler, onPrevHandler })}
    />
  )
}

export default Identification

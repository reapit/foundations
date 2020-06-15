import React from 'react'
import { ContactModel, IdentityDocumentModel } from '@reapit/foundations-ts-definitions'
import { Button, Input, DatePicker, CameraImageInput, Formik, Form } from '@reapit/elements'
import SelectIdentity from '@/components/ui/inputs/select-identity'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { downloadDocument } from '@/services/documents'
import validationSchema from './form-schema/validation-schema'
import FormFields from './form-schema/form-fields'

const { typeIdField, detailsField, expiryField, documentIdField } = FormFields

export interface IdentityDocumentForm extends IdentityDocumentModel {
  documentId: string
}

export const IDENTIFICATION_FORM_DEFAULT_VALUES: IdentityDocumentForm = {
  typeId: '',
  details: '',
  expiry: '',
  documentId: '',
}

export type IdentificationProps = {
  contact: ContactModel | null
  initFormValues: IdentityDocumentForm
  loading: boolean
  disabled?: boolean
  onSaveHandler: (values: any) => void
  onNextHandler: (values: any) => () => void
  onPrevHandler: () => void
}

export const renderFormHandler = ({
  contact,
  loading,
  onNextHandler,
  onPrevHandler,
  disabled = false,
}: IdentificationProps) => ({ values }) => {
  const id = contact?.id || ''

  const handleFilenameClick = event => {
    event.preventDefault()
    downloadDocument(values.documentId)
  }

  return (
    <>
      {disabled && (
        <p className="mb-4">*Please ensure the Primary ID has been completed before adding a Secondary ID</p>
      )}
      <Form>
        <SelectIdentity id={typeIdField.name} name={typeIdField.name} labelText={typeIdField.label || ''} />
        <Input
          id={detailsField.name}
          name={detailsField.name}
          type="text"
          placeholder={detailsField.placeHolder}
          required
          labelText={detailsField.label}
        />
        <DatePicker id={expiryField.name} name={expiryField.name} labelText={expiryField.label} required />
        <CameraImageInput
          id={documentIdField.name}
          name={documentIdField.name}
          labelText={documentIdField.label || ''}
          allowClear={true}
          inputProps={{ disabled: disabled }}
          required
          onFilenameClick={handleFilenameClick}
          isNarrowWidth
          accept="image/*"
        />
        <div className="field pb-2">
          <div className={`columns ${styles.reverseColumns}`}>
            <div className="column">
              <div className={`${styles.isFullHeight} flex items-center`}>
                <span>RPS Ref:</span>
                <span className="ml-1">{id}</span>
              </div>
            </div>
            <div className={`column ${styles.btnContainer}`}>
              <Button className="mr-2" variant="primary" type="submit" loading={loading} disabled={disabled}>
                Save
              </Button>
              <Button className="mr-2" variant="primary" type="button" onClick={onPrevHandler} disabled={loading}>
                Previous
              </Button>
              <Button variant="primary" type="button" onClick={onNextHandler(values)} disabled={loading || disabled}>
                Next
              </Button>
            </div>
          </div>
        </div>
        <p className="is-size-6">* Indicates fields that are required in order to ‘Complete’ this section.</p>
      </Form>
    </>
  )
}

export const onSubmitHandler = (onSaveHandler: (formValues: IdentityDocumentForm) => void) => (
  formValues: IdentityDocumentForm,
) => onSaveHandler(formValues)

export const Identification: React.FC<IdentificationProps> = props => (
  <Formik
    initialValues={props.initFormValues}
    onSubmit={onSubmitHandler(props.onSaveHandler)}
    validationSchema={validationSchema}
  >
    {renderFormHandler(props)}
  </Formik>
)

export default Identification

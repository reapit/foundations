import React, { Dispatch, SetStateAction, useState } from 'react'
import { ContactModel, IdentityDocumentModel } from '@reapit/foundations-ts-definitions'
import { Button, Input, CameraImageInput, Formik, Form, ButtonGroup, ModalV2, Loader, Section } from '@reapit/elements'
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

export interface ModalState {
  image: string | null
  isLoading: boolean
  isVisible: boolean
}

export const onSubmitHandler = (onSaveHandler: (formValues: IdentityDocumentForm) => void) => (
  formValues: IdentityDocumentForm,
) => onSaveHandler(formValues)

export const handleFilenameClick = (
  values: IdentityDocumentForm,
  setModalState: Dispatch<SetStateAction<ModalState>>,
) => async (e) => {
  e.preventDefault()
  setModalState({ isLoading: true, isVisible: true, image: null })
  const imageURL = await downloadDocument(values.documentId)
  const image = imageURL ? imageURL : null
  setModalState({ isLoading: false, isVisible: true, image })
}

export const handleCloseModal = (setModalState: Dispatch<SetStateAction<ModalState>>) => () => {
  setModalState({ isLoading: false, isVisible: false, image: null })
}

export const Identification: React.FC<IdentificationProps> = ({
  initFormValues,
  onSaveHandler,
  contact,
  loading,
  onNextHandler,
  onPrevHandler,
  disabled = false,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    image: null,
    isLoading: false,
    isVisible: false,
  })
  return (
    <Formik
      validateOnMount
      initialValues={initFormValues}
      onSubmit={onSubmitHandler(onSaveHandler)}
      validationSchema={validationSchema}
    >
      {({ values, isValid }) => {
        const id = contact?.id || ''
        return (
          <>
            {disabled && (
              <p data-test="primaryIdWarinLabel" className="mb-4">
                *Please ensure the Primary ID has been completed before adding a Secondary ID
              </p>
            )}
            <Form>
              <SelectIdentity id={typeIdField.name} name={typeIdField.name} labelText={typeIdField.label} />
              <Input
                id={detailsField.name}
                name={detailsField.name}
                type="text"
                placeholder={detailsField.placeHolder}
                required
                labelText={detailsField.label}
              />
              <Input id={expiryField.name} name={expiryField.name} type="date" labelText={expiryField.label} required />
              <CameraImageInput
                id={documentIdField.name}
                name={documentIdField.name}
                labelText={documentIdField.label}
                allowClear={true}
                inputProps={{ disabled: disabled }}
                required
                onFilenameClick={handleFilenameClick(values, setModalState)}
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
                  <ButtonGroup hasSpacing isCentered>
                    <Button
                      className="mr-2"
                      variant="success"
                      type="submit"
                      loading={loading}
                      disabled={loading || disabled || !isValid}
                    >
                      Save
                    </Button>
                    <Button
                      className="mr-2"
                      variant="secondary"
                      type="button"
                      onClick={onPrevHandler}
                      disabled={loading}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={onNextHandler(values)}
                      disabled={loading || disabled || !isValid}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <p className="is-size-6">* Indicates fields that are required in order to ‘Complete’ this section.</p>
            </Form>
            <ModalV2
              isCentered
              isResponsive
              visible={modalState.isVisible}
              afterClose={handleCloseModal(setModalState)}
              title="Viewing document"
            >
              {modalState.isLoading ? (
                <Loader />
              ) : (
                <Section>
                  <img src={modalState.image || ''} />
                </Section>
              )}
            </ModalV2>
          </>
        )
      }}
    </Formik>
  )
}

export default Identification

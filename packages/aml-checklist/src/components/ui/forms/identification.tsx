import React, { Dispatch, SetStateAction, useState } from 'react'
import { ContactModel, IdentityDocumentModel } from '@reapit/foundations-ts-definitions'
import {
  Button,
  Input,
  CameraImageInput,
  Formik,
  Form,
  ButtonGroup,
  ModalV2,
  Loader,
  Section,
  Pagination,
} from '@reapit/elements'
import SelectIdentity from '@/components/ui/inputs/select-identity'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { downloadDocument } from '@/services/documents'
import validationSchema from './form-schema/validation-schema'
import FormFields from './form-schema/form-fields'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

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
  const visibleState = image ? true : false
  setModalState({ isLoading: false, isVisible: visibleState, image })
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

  const [imageError, setImageError] = useState<boolean>(false)
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
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
              isResponsive
              isCentered
              visible={modalState.isVisible}
              afterClose={handleCloseModal(setModalState)}
              title="Viewing document"
            >
              <>
                {modalState.isLoading ? (
                  <Loader />
                ) : imageError && modalState.image ? (
                  <Document file={modalState.image} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                    <Pagination
                      className="mb-0 px-0 py-4"
                      pageNumber={pageNumber}
                      totalCount={numPages}
                      onChange={setPageNumber}
                    />
                  </Document>
                ) : (
                  <Section>
                    <img src={modalState.image || ''} onError={() => setImageError(true)} />
                  </Section>
                )}
                {modalState.image && (
                  <ButtonGroup hasSpacing isCentered>
                    <a className="button is-primary" href={modalState.image}>
                      Download Document
                    </a>
                  </ButtonGroup>
                )}
              </>
            </ModalV2>
          </>
        )
      }}
    </Formik>
  )
}

export default Identification

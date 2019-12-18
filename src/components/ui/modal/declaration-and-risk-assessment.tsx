import React from 'react'
import { Input, Button, CameraImageInput, SelectBox, Formik, Form } from '@reapit/elements'
import { connect } from 'react-redux'
import { RISK_ASSESSMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { checklistDetailShowModal, updateDeclarationAndRisk } from '@/actions/checklist-detail'
import { STEPS } from './modal'
import { Dispatch } from 'redux'

const optionsRiskAssessmentType = [
  { label: 'Please select...', value: '' },
  { label: RISK_ASSESSMENT_TYPE.SIMPLIFIED, value: RISK_ASSESSMENT_TYPE.SIMPLIFIED },
  { label: RISK_ASSESSMENT_TYPE.NORMAL, value: RISK_ASSESSMENT_TYPE.NORMAL },
  { label: RISK_ASSESSMENT_TYPE.ENHANCED, value: RISK_ASSESSMENT_TYPE.ENHANCED }
]

export const renderForm = ({ onNextHandler, onPrevHandler, isSubmitting }) => ({ values }) => {
  return (
    <Form>
      <div>
        <div>
          <label className="label">Declaration Form</label>
          <CameraImageInput
            labelText="Upload file"
            id="metadata.declarationRisk.declarationForm"
            name="metadata.declarationRisk.declarationForm"
            allowClear={true}
          />
        </div>
        <SelectBox
          labelText="Risk Assessment Type"
          id="metadata.declarationRisk.type"
          name="metadata.declarationRisk.type"
          options={optionsRiskAssessmentType}
          required
        />
        <Input
          type="text"
          labelText="Reason for Type"
          id="metadata.declarationRisk.reason"
          name="metadata.declarationRisk.reason"
          required
        />
        <div>
          <label className="label">Risk Assessment Form</label>
          <CameraImageInput
            labelText="Upload file"
            id="metadata.declarationRisk.riskAssessmentForm"
            name="metadata.declarationRisk.riskAssessmentForm"
            allowClear={true}
            required
          />
        </div>
      </div>
      <div className={styles.footerBtn}>
        <Button loading={isSubmitting} className="mr-2" variant="primary" type="submit">
          Save
        </Button>
        <Button disabled={isSubmitting} className="mr-2" variant="primary" type="button" onClick={onPrevHandler}>
          Previous
        </Button>
        <Button disabled={isSubmitting} variant="primary" type="button" onClick={onNextHandler(values)}>
          Next
        </Button>
      </div>
    </Form>
  )
}

export type DeclarationAndRiskAssessmentProps = StateProps & DispatchProps

export const DeclarationAndRiskAssessment: React.FC<DeclarationAndRiskAssessmentProps> = ({
  contact,
  onNextHandler,
  onPrevHandler,
  onHandleSubmit,
  isSubmitting
}) => {
  const metadata = contact?.metadata || {
    declarationRisk: {
      type: '',
      reason: ''
    }
  }
  const initialValues = React.useMemo(
    () => ({
      metadata
    }),
    [contact]
  )
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onHandleSubmit}>
        {renderForm({
          onNextHandler,
          onPrevHandler,
          isSubmitting
        })}
      </Formik>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    contact: state?.checklistDetail?.checklistDetailData?.contact || {}
  }
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export type DispatchProps = {
  onNextHandler: (values: any) => () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export type OwnPropsProps = {
  id: string
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onHandleSubmit: values => dispatch(updateDeclarationAndRisk({ contact: values })),
    onNextHandler: (values: any) => () =>
      dispatch(updateDeclarationAndRisk({ nextSection: STEPS.PEP_SEARCH, contact: values })),
    onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.ADDRESS_INFORMATION))
  }
}

export const DeclarationAndRiskAssessmentWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclarationAndRiskAssessment)

DeclarationAndRiskAssessmentWithRedux.displayName = 'DeclarationAndRiskAssessmentWithReduxWithRedux'

export default DeclarationAndRiskAssessmentWithRedux

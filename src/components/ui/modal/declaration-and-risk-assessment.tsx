import React from 'react'
import { Input, Button, CameraImageInput, SelectBox } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { RISK_ASSESSMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@/types/contact-api-schema'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
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
            labelText="Upload file/Take a picture"
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
        />
        <Input
          type="text"
          labelText="Reason for Type"
          id="metadata.declarationRisk.reason"
          name="metadata.declarationRisk.reason"
        />
        <div>
          <label className="label">Risk Assessment Form</label>
          <CameraImageInput
            labelText="Upload file"
            id="metadata.declarationRisk.riskAssessmentForm"
            name="metadata.declarationRisk.riskAssessmentForm"
            allowClear={true}
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
  const metadata = oc(contact).metadata({})
  const initialValues = React.useMemo(
    () => ({
      metadata
    }),
    [contact]
  )
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onHandleSubmit}
        render={renderForm({
          onNextHandler,
          onPrevHandler,
          isSubmitting
        })}
      />
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: oc(state).checklistDetail.isSubmitting(false),
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
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
    onNextHandler: (values: any) => () => {
      console.log(values)
      dispatch(updateDeclarationAndRisk({ nextSection: STEPS.PEP_SEARCH, contact: values }))
    },
    onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.ADDRESS_INFORMATION))
  }
}

export const DeclarationAndRiskAssessmentWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclarationAndRiskAssessment)

DeclarationAndRiskAssessmentWithRedux.displayName = 'DeclarationAndRiskAssessmentWithReduxWithRedux'

export default DeclarationAndRiskAssessmentWithRedux

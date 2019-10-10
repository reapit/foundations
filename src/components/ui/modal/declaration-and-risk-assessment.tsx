import React from 'react'
import { Input, Button, SelectBox, CameraImageInput, FileInput } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { RISK_ASSESSMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@/types/contact-api-schema'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { checkListDetailShowModal, checkListDetailDeclarationAndRiskUpdateData } from '@/actions/checklist-detail'
import { STEPS } from './modal'
import { Dispatch } from 'redux'

const optionsRiskAssessmentType = [
  { label: RISK_ASSESSMENT_TYPE.SIMPLIFIED, value: RISK_ASSESSMENT_TYPE.SIMPLIFIED },
  { label: RISK_ASSESSMENT_TYPE.NORMAL, value: RISK_ASSESSMENT_TYPE.NORMAL },
  { label: RISK_ASSESSMENT_TYPE.ENHANCED, value: RISK_ASSESSMENT_TYPE.ENHANCED }
]

export const renderForm = ({ onNextHandler, onPrevHandler, isSubmitting }) => () => {
  return (
    <Form>
      <div>
        <div>
          <label className="label">Declaration Form</label>
          <CameraImageInput
            labelText="Upload file/Take a picture"
            id="metadata.declarationAndRisk.declarationForm"
            name="metadata.declarationAndRisk.declarationForm"
          />
        </div>
        <SelectBox
          labelText="Risk Assessment Type"
          id="metadata.declarationAndRisk.type"
          name="metadata.declarationAndRisk.type"
          options={optionsRiskAssessmentType}
        />
        <Input
          type="text"
          labelText="Reason for Type"
          id="metadata.declarationAndRisk.reason"
          name="metadata.declarationAndRisk.reason"
        />
        <div>
          <label className="label">Risk Assessment Form</label>
          <FileInput
            labelText="Upload file"
            id="metadata.declarationAndRisk.riskAssessmentForm"
            name="metadata.declarationAndRisk.riskAssessmentForm"
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
        <Button disabled={isSubmitting} variant="primary" type="button" onClick={onNextHandler}>
          Next
        </Button>
      </div>
    </Form>
  )
}

export type DeclarationAndRiskAssessmentProps = {
  contact: ContactModel
  isSubmitting: boolean
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export interface DeclarationAndRiskModel {
  declarationForm: string
  riskAssessmentForm: string
  type: string
  reason: string
}

export const DeclarationAndRiskAssessment: React.FC<DeclarationAndRiskAssessmentProps> = ({
  contact,
  onNextHandler,
  onPrevHandler,
  onHandleSubmit,
  isSubmitting
}) => {
  const data = oc(contact).metadata.declarationAndRisk({}) as DeclarationAndRiskModel
  const initialValues = React.useMemo(
    () => ({
      metadata: {
        declarationAndRisk: {
          reason: data.reason,
          type: data.type || 'Simplified'
        }
      }
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

export const mapStateToProps = (state: ReduxState): MappedProps => {
  return {
    isSubmitting: oc(state).checklistDetail.isSubmitting(false),
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
  }
}

export type MappedProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export type MappedActions = {
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export type OwnPropsProps = {
  id: string
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnPropsProps): MappedActions => {
  return {
    onHandleSubmit: values => {
      const newValues = {
        ...values,
        id: ownProps.id
      }
      dispatch(checkListDetailDeclarationAndRiskUpdateData(newValues))
    },
    onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.PEP_SEARCH)),
    onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.ADDRESS_INFORMATION))
  }
}

export const DeclarationAndRiskAssessmentWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclarationAndRiskAssessment)

DeclarationAndRiskAssessmentWithRedux.displayName = 'DeclarationAndRiskAssessmentWithReduxWithRedux'

export default DeclarationAndRiskAssessmentWithRedux

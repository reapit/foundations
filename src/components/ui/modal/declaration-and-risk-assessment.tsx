import React from 'react'
import { Input, Button, SelectBox, CameraImageInput, FileInput } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { RISK_ASSESSMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@/types/contact-api-schema'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { checkListDetailShowModal } from '@/actions/checklist-detail'
import { STEPS } from './modal'
import { Dispatch } from 'redux'

const optionsRiskAssessmentType = [
  { label: RISK_ASSESSMENT_TYPE.SIMPLIFIED, value: RISK_ASSESSMENT_TYPE.SIMPLIFIED },
  { label: RISK_ASSESSMENT_TYPE.NORMAL, value: RISK_ASSESSMENT_TYPE.NORMAL },
  { label: RISK_ASSESSMENT_TYPE.ENHANCED, value: RISK_ASSESSMENT_TYPE.ENHANCED }
]

export const renderForm = ({ onNextHandler, onPrevHandler }) => () => {
  return (
    <div>
      <div className={styles.bold}>Declaration and Risk Assessment</div>
      <Form>
        <div>
          <CameraImageInput labelText="Upload file/Take a picture" id="declaration" name="declaration" />
          <SelectBox
            labelText="Risk Assessment Type"
            id="riskAssessmentType"
            name="riskAssessmentType"
            options={optionsRiskAssessmentType}
          />
          <Input type="text" labelText="Reason for Type" id="type" name="type" />
          <FileInput labelText="Upload file" id="riskAssessment" name="riskAssessment" />
        </div>
        <div className={styles.footerBtn}>
          <Button className="mr-2" variant="primary" type="submit">
            Save
          </Button>
          <Button className="mr-2" variant="primary" type="button" onClick={onNextHandler}>
            Next
          </Button>
          <Button variant="primary" type="button" onClick={onPrevHandler}>
            Previous
          </Button>
        </div>
      </Form>
    </div>
  )
}

export type DeclarationAndRiskAssessmentProps = {
  contact: ContactModel
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export const DeclarationAndRiskAssessment: React.FC<DeclarationAndRiskAssessmentProps> = ({
  // contact,
  onNextHandler,
  onPrevHandler,
  onHandleSubmit
}) => {
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={onHandleSubmit}
        render={renderForm({
          onNextHandler,
          onPrevHandler
        })}
      />
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): MappedProps => {
  return {
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
  }
}

export type MappedProps = {
  contact: ContactModel
}

export type MappedActions = {
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): MappedActions => {
  return {
    onHandleSubmit: values => {
      console.log(values)
    },
    onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.DECLARATION_RISK_MANAGEMENT)),
    onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.ADDRESS_INFORMATION))
  }
}

export const DeclarationAndRiskAssessmentWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclarationAndRiskAssessment)

DeclarationAndRiskAssessmentWithRedux.displayName = 'DeclarationAndRiskAssessmentWithReduxWithRedux'

export default DeclarationAndRiskAssessmentWithRedux

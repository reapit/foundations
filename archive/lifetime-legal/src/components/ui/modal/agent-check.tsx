import React from 'react'
import { SelectBox, DatePicker, SelectBoxOptions, Button, Input, RadioSelect, Formik, Form } from '@reapit/elements'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { Dispatch } from 'redux'
import { checkListDetailAgentCheckUpdateData } from '@/actions/checklist-detail'

export const referralOptionsValues = {
  APPLICANT: 'Applicant',
  ESTATE_PLANNING: 'Estate Planning',
  MEMBER_SHIP: 'Membership',
  PURCHASER_COMPLIANCE: 'Purchaser Compliance',
  PURCHASER_OFFER_ACCEPTED: 'Purchaser: Offer accepted',
  PURCHASER_OFFER_ACCEPTED_Q_OUT: 'Purchaser: Offer accepted Q Out',
  PURCHASER_OFFER_MADE: 'Purchaser: Offer made',
  PURCHASER_OFFER_MADE_Q_OUT: 'Purchaser: Offer made Q Out',
  VENDOR_COMPLIANCE: 'Vendor Compliance',
  VENDOR_NEW_ON_MARKET: 'Vendor: New on market',
  VENDOR_PROPERTY_SOLD: 'Vendor: Property sold',
  DATE_TO_CALL_CLIENT: 'Date to call client (calendar for date)',
  TIME_SELECTION: 'Time selection – Hours and Minutes',
}

const referralOptions = [
  {
    label: 'Please select',
    value: '',
  },
  {
    label: referralOptionsValues.APPLICANT,
    value: referralOptionsValues.APPLICANT,
  },
  {
    label: referralOptionsValues.ESTATE_PLANNING,
    value: referralOptionsValues.ESTATE_PLANNING,
  },
  {
    label: referralOptionsValues.MEMBER_SHIP,
    value: referralOptionsValues.MEMBER_SHIP,
  },
  {
    label: referralOptionsValues.PURCHASER_COMPLIANCE,
    value: referralOptionsValues.PURCHASER_COMPLIANCE,
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_ACCEPTED,
    value: referralOptionsValues.PURCHASER_OFFER_ACCEPTED,
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_ACCEPTED_Q_OUT,
    value: referralOptionsValues.PURCHASER_OFFER_ACCEPTED_Q_OUT,
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_MADE,
    value: referralOptionsValues.PURCHASER_OFFER_MADE,
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_MADE_Q_OUT,
    value: referralOptionsValues.PURCHASER_OFFER_MADE_Q_OUT,
  },
  {
    label: referralOptionsValues.VENDOR_COMPLIANCE,
    value: referralOptionsValues.VENDOR_COMPLIANCE,
  },
  {
    label: referralOptionsValues.VENDOR_NEW_ON_MARKET,
    value: referralOptionsValues.VENDOR_NEW_ON_MARKET,
  },
  {
    label: referralOptionsValues.VENDOR_PROPERTY_SOLD,
    value: referralOptionsValues.VENDOR_PROPERTY_SOLD,
  },
  {
    label: referralOptionsValues.DATE_TO_CALL_CLIENT,
    value: referralOptionsValues.DATE_TO_CALL_CLIENT,
  },
  {
    label: referralOptionsValues.TIME_SELECTION,
    value: referralOptionsValues.TIME_SELECTION,
  },
] as SelectBoxOptions[]

export const renderOptions = (minNumber, maxNumber, step): SelectBoxOptions[] => {
  const options: SelectBoxOptions[] = []
  for (let i = minNumber; i <= maxNumber; i += step) {
    options.push({
      label: `${i}`,
      value: `${i}`,
    })
  }
  return options
}

export const renderForm = ({ isSubmitting, isDisabledSubmit }) => ({ setFieldValue, values }) => {
  return (
    <Form>
      <SelectBox name="referralType" id="referralType" labelText="Referral Type" options={referralOptions} />
      <DatePicker name="dateCallClient" id="dateCallClient" labelText="Date to call client" />
      <Input type="time" labelText="Time" id="timeSelection" name="timeSelection" />
      <RadioSelect
        state={values['clientType']}
        setFieldValue={setFieldValue}
        id="clientType"
        dataTest="clientType"
        name="clientType"
        labelText="Is the client acting on their own behalf or on behalf of a Company?"
        options={[
          { label: 'Individual', value: 'Individual' },
          { label: 'Company', value: 'Company' },
        ]}
      />
      <RadioSelect
        state={values['isUKResident']}
        setFieldValue={setFieldValue}
        id="isUKResident"
        dataTest="isUKResident"
        name="isUKResident"
        labelText="Is the client a UK resident?"
        options={[
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ]}
      />
      <RadioSelect
        state={values['placeMeet']}
        setFieldValue={setFieldValue}
        id="placeMeet"
        dataTest="placeMeet"
        name="placeMeet"
        labelText="Where did the Estate Agent meet with the Client? "
        options={[
          { label: 'Home Address', value: 'Home Address' },
          { label: 'Other Location', value: 'Other Location' },
          { label: 'Did Not Meet', value: 'Did Not Meet' },
        ]}
      />
      <div className="flex justify-end">
        <Button disabled={isDisabledSubmit} loading={isSubmitting} type="submit" className="mr-2" variant="primary">
          Save
        </Button>
      </div>
    </Form>
  )
}

export type AgentCheckProps = DispatchProps & StateProps

export const AgentCheck: React.FC<AgentCheckProps> = ({
  isSubmitting,
  onHandleSubmit,
  identityCheck,
  isDisabledSubmit,
}: AgentCheckProps) => {
  const agentCheck = identityCheck?.metadata || {}
  return (
    <Formik
      initialValues={{
        ...agentCheck,
      }}
      onSubmit={onHandleSubmit}
    >
      {renderForm({ isSubmitting, isDisabledSubmit })}
    </Formik>
  )
}

export type StateProps = {
  isSubmitting: boolean
  identityCheck: IdentityCheckModel
  isDisabledSubmit: boolean
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    identityCheck: state?.checklistDetail?.checklistDetailData?.idCheck || {},
    isDisabledSubmit: !state?.checklistDetail?.checklistDetailData?.idCheck?.identityDocument1,
  }
}

export type DispatchProps = {
  onHandleSubmit: (values: any) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onHandleSubmit: (values: any) => {
      dispatch(checkListDetailAgentCheckUpdateData(values))
    },
  }
}

export const AgentCheckWithRedux = connect<StateProps, DispatchProps, {}, ReduxState>(
  mapStateToProps,
  mapDispatchToProps,
)(AgentCheck)

AgentCheckWithRedux.displayName = 'AgentCheckWithRedux'

export default AgentCheckWithRedux

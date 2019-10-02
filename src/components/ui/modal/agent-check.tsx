import React from 'react'
import { Formik } from 'formik'
import { SelectBox, DatePicker, SelectBoxOptions, Button, RadioSelect } from '@reapit/elements'
import { Dispatch } from 'redux'
import { oc } from 'ts-optchain'
import { connect } from 'react-redux'
import { checkListDetailShowModal } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import { ContactModel } from '@/types/contact-api-schema'
import { STEPS } from './modal'

export type AgentCheckProps = {
  id: string
  isSubmitting: boolean
  onPrevHandler: () => void
  onNextHandler: () => void
}

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
  TIME_SELECTION: 'Time selection – Hours and Minutes'
}

const referralOptions = [
  {
    label: referralOptionsValues.APPLICANT,
    value: referralOptionsValues.APPLICANT
  },
  {
    label: referralOptionsValues.ESTATE_PLANNING,
    value: referralOptionsValues.ESTATE_PLANNING
  },
  {
    label: referralOptionsValues.MEMBER_SHIP,
    value: referralOptionsValues.MEMBER_SHIP
  },
  {
    label: referralOptionsValues.PURCHASER_COMPLIANCE,
    value: referralOptionsValues.PURCHASER_COMPLIANCE
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_ACCEPTED,
    value: referralOptionsValues.PURCHASER_OFFER_ACCEPTED
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_ACCEPTED_Q_OUT,
    value: referralOptionsValues.PURCHASER_OFFER_ACCEPTED_Q_OUT
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_MADE,
    value: referralOptionsValues.PURCHASER_OFFER_MADE
  },
  {
    label: referralOptionsValues.PURCHASER_OFFER_MADE_Q_OUT,
    value: referralOptionsValues.PURCHASER_OFFER_MADE_Q_OUT
  },
  {
    label: referralOptionsValues.VENDOR_COMPLIANCE,
    value: referralOptionsValues.VENDOR_COMPLIANCE
  },
  {
    label: referralOptionsValues.VENDOR_NEW_ON_MARKET,
    value: referralOptionsValues.VENDOR_NEW_ON_MARKET
  },
  {
    label: referralOptionsValues.VENDOR_PROPERTY_SOLD,
    value: referralOptionsValues.VENDOR_PROPERTY_SOLD
  },
  {
    label: referralOptionsValues.DATE_TO_CALL_CLIENT,
    value: referralOptionsValues.DATE_TO_CALL_CLIENT
  },
  {
    label: referralOptionsValues.TIME_SELECTION,
    value: referralOptionsValues.TIME_SELECTION
  }
] as SelectBoxOptions[]

export const renderOptions = (minNumber, maxNumber, step): SelectBoxOptions[] => {
  const options: SelectBoxOptions[] = []
  for (let i = minNumber; i <= maxNumber; i += step) {
    options.push({
      label: `${i}`,
      value: `${i}`
    })
  }
  return options
}

export const renderForm = ({ isSubmitting, onPrevHandler, onNextHandler }) => () => {
  return (
    <div>
      <SelectBox name="referralType" id="referralType" labelText="Referral Type" options={referralOptions} />
      <DatePicker name="dateCallClient" id="dateCallClient" labelText="Date to call client" />
      <SelectBox name="hourSelection" id="hourSelection" labelText="Hour" options={renderOptions(1, 24, 1)} />
      <SelectBox name="minuteSelection" id="minuteSelection" labelText="Minute" options={renderOptions(0, 60, 5)} />
      <RadioSelect
        id="clientType"
        dataTest="clientType"
        name="clientType"
        labelText="Is the client acting on their own behalf or on behalf of a Company?"
        options={[{ label: 'Individual', value: 'Individual' }, { label: 'Company', value: 'Company' }]}
      />
      <RadioSelect
        id="isUKResident"
        dataTest="isUKResident"
        name="isUKResident"
        labelText="Is the client a UK resident?"
        options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
      />
      <RadioSelect
        id="placeMeet"
        dataTest="placeMeet"
        name="placeMeet"
        labelText="Where did the Estate Agent meet with the Client? "
        options={[
          { label: 'Home Address', value: 'Home Address' },
          { label: 'Other Location', value: 'Other Location' },
          { label: 'Did Not Meet', value: 'Did Not Meet' }
        ]}
      />
      <div className="flex justify-end">
        <Button loading={isSubmitting} type="submit" className="mr-2" variant="primary">
          Save
        </Button>
        <Button className="mr-2" variant="primary" type="button" onClick={onPrevHandler}>
          Previous
        </Button>
        <Button variant="primary" type="button" onClick={onNextHandler}>
          Next
        </Button>
      </div>
    </div>
  )
}

export const AgentCheck: React.FC<AgentCheckProps> = ({ isSubmitting, onPrevHandler, onNextHandler }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        console.log('abc')
      }}
      render={renderForm({ isSubmitting, onPrevHandler, onNextHandler })}
    />
  )
}

export type MappedProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): MappedProps => {
  return {
    isSubmitting: oc(state).checklistDetail.isSubmitting(false),
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
  }
}

export type MappedActions = {
  onPrevHandler: () => void
  onNextHandler: () => void
  onHandleSubmit: (values: any) => void
}

export type OwnPropsProps = {
  id: string
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnPropsProps): MappedActions => {
  return {
    onHandleSubmit: (values: any) => {
      const newValues = {
        ...values,
        id: ownProps.id
      }
      console.log(newValues)
    },
    onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.EXPERIAN)),
    onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.REPORT))
  }
}

export const AgentCheckWithRedux = connect<MappedProps, MappedActions, OwnPropsProps, ReduxState>(
  mapStateToProps,
  mapDispatchToProps
)(AgentCheck)

AgentCheckWithRedux.displayName = 'AgentCheckWithRedux'

export default AgentCheckWithRedux

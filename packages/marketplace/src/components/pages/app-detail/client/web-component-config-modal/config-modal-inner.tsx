import React from 'react'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Formik,
  RadioSelect,
  Checkbox,
  Loader,
  FormikValues,
  DropdownSelect,
  SelectOption,
  FormikProps,
} from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { updateWebComponentConfig } from '@/actions/web-component'
import {
  selectWebComponentData,
  selectWebComponentLoading,
  selectWebComponentUpdating,
} from '@/selector/web-components'
import { selectNegotiators } from '@/selector/negotiators'
import { UpdateWebComponentConfigParams } from '@/services/web-component'
import { Dispatch } from 'redux'
import { selectAppDetailData } from '@/selector/apps'

export const handleUpdateWebComponentConfig = (dispatch: Dispatch, appId: string, callback) => (
  params: FormikValues,
) => {
  dispatch(updateWebComponentConfig({ ...params, appId, callback } as UpdateWebComponentConfigParams))
}

export const genarateNegotiatorOptions = (negotiators: NegotiatorModel[]): SelectOption[] => {
  return negotiators.map(
    negotiator =>
      ({
        value: negotiator.id,
        label: negotiator.name,
        description: negotiator.name,
      } as SelectOption),
  )
}
export type WebComponentConfigModalBodyProps = {
  subtext: string
  formikProps: FormikProps<any>
}
export const WebComponentConfigModalBody = ({ subtext, formikProps }: WebComponentConfigModalBodyProps) => {
  const { values, setFieldValue } = formikProps
  const negotiators = useSelector(selectNegotiators)
  const negotiatorOptions = genarateNegotiatorOptions(negotiators)

  return (
    <>
      <p>{subtext}</p>
      <RadioSelect
        labelText="Time between appointments"
        subText="Select a time between each appointment"
        id="appointmentTimeGap"
        name="appointmentTimeGap"
        isHorizontal
        options={[
          { label: '15 mins', value: 15 },
          { label: '30 mins', value: 30 },
          { label: '1hr', value: 60 },
          { label: '1hr 30mins', value: 90 },
        ]}
        state={values.appointmentTimeGap}
        setFieldValue={setFieldValue}
        className="checkbox-inline mt-5"
      />
      <RadioSelect
        labelText="Length of Appointments"
        subText="Select a length of appointments"
        id="appointmentLength"
        name="appointmentLength"
        isHorizontal
        options={[
          { label: '15 mins', value: 15 },
          { label: '30 mins', value: 30 },
          { label: '1hr', value: 60 },
          { label: '1hr 30mins', value: 90 },
        ]}
        state={values.appointmentLength}
        setFieldValue={setFieldValue}
        className="checkbox-inline mt-5"
      />
      <div className="field mt-5">
        <div className="control">
          <label className="label">Days of the week</label>
          <label className="subtext mb-5">Select which days of the week you would like to display</label>
          <div className="container-flex flex-wrap">
            <Checkbox name="daysOfWeek" id="Monday" labelText="Monday" value="1" className="mr-5" />
            <Checkbox name="daysOfWeek" id="Tuesday" labelText="Tuesday" value="2" className="mr-5" />
            <Checkbox name="daysOfWeek" id="Wednesday" labelText="Wednesday" value="3" className="mr-5" />
            <Checkbox name="daysOfWeek" id="Thursday" labelText="Thursday" value="4" className="mr-5" />
            <Checkbox name="daysOfWeek" id="Friday" labelText="Friday" value="5" className="mr-5" />
            <Checkbox name="daysOfWeek" id="Saturday" labelText="Saturday" value="6" className="mr-5" />
            <Checkbox name="daysOfWeek" id="Sunday" labelText="Sunday" value="0" />
          </div>
        </div>
      </div>
      <DropdownSelect
        id="negotiatorIds"
        name="negotiatorIds"
        labelText="Negotiators"
        subText="Select which negotiators will be avaiable to attend appointments"
        options={negotiatorOptions}
        dropdownStyle={{ zIndex: 41 }}
      />
    </>
  )
}

export type WebComponentConfigModalFooterProps = {
  closeModal: () => void
  formikProps: FormikProps<any>
}

export const WebComponentConfigModalFooter = ({ closeModal, formikProps }: WebComponentConfigModalFooterProps) => {
  const updating = useSelector(selectWebComponentUpdating)
  const { handleSubmit } = formikProps
  return (
    <>
      <Button className="mr-2" type="button" onClick={closeModal} variant="danger" fullWidth={true}>
        CANCEL
      </Button>
      <Button variant="primary" type="submit" fullWidth={true} loading={updating} onClick={handleSubmit}>
        SAVE CHANGES
      </Button>
    </>
  )
}

export type WebComponentConfigModalInnerProps = {
  closeModal: () => void
}

export const WebComponentConfigModalInner = ({ closeModal }: WebComponentConfigModalInnerProps) => {
  const dispatch = useDispatch()

  const webComponentData = useSelector(selectWebComponentData)
  const loading = useSelector(selectWebComponentLoading)
  const appDetails = useSelector(selectAppDetailData)
  const { name, id = '' } = appDetails

  const title = `${name} Configuration`
  const subtext = `Please use the following form to configure your diary settings for your 
                    ‘${name}’ widget on your website`

  const initialFormValues = (webComponentData || {
    appointmentLength: 30,
    appointmentTimeGap: 30,
    daysOfWeek: ['1', '2', '3', '4', '5', '6'],
  }) as FormikValues

  if (loading) return <Loader />
  return (
    <Formik initialValues={initialFormValues} onSubmit={handleUpdateWebComponentConfig(dispatch, id, closeModal)}>
      {formikProps => (
        <>
          <ModalHeader title={title} />
          <ModalBody body={<WebComponentConfigModalBody subtext={subtext} formikProps={formikProps} />} />
          <ModalFooter
            footerItems={<WebComponentConfigModalFooter closeModal={closeModal} formikProps={formikProps} />}
          />
        </>
      )}
    </Formik>
  )
}

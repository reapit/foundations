import React, { useEffect } from 'react'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Formik,
  RadioSelect,
  Checkbox,
  Form,
  Loader,
  FormikValues,
  DropdownSelect,
  SelectOption,
} from '@reapit/elements'
import styles from '@/styles/elements/radioselect.scss?mod'
import { useDispatch, useSelector } from 'react-redux'
import { clientFetchWebComponentConfig, clientPutWebComponentConfig } from '@/actions/client'
import { selectIsWebComponentData, selectIsWebComponentLoading, selectIsWebComponentUpdating } from '@/selector/client'
import { PutWebComponentConfigParams } from '@/services/web-component'
import { selectClientId } from '@/selector/auth'
import { Dispatch } from 'redux'

export const updateWebComponentConfig = (dispatch: Dispatch) => (params: FormikValues) => {
  dispatch(clientPutWebComponentConfig(params as PutWebComponentConfigParams))
}

export const handleFetchWebComponentConfig = (dispatch: Dispatch, customerId?: string) => () => {
  customerId && dispatch(clientFetchWebComponentConfig({ customerId }))
}

export const genarateNegotiatorOptions = (): SelectOption[] => {
  //MUST CHANGE WHEN API READY
  return [
    {
      label: 'Joe Smith',
      value: '1',
      description: 'Joe Smith',
    },
    {
      label: 'Jack',
      value: '2',
      description: 'Jack',
    },
  ] as SelectOption[]
}

export const WebComponentConfigModalBody = ({ subtext, formikProps }) => {
  const { values, setFieldValue } = formikProps
  return (
    <>
      <p>{subtext}</p>
      <RadioSelect
        labelText="Time between appointments"
        subText="Select a time between each appointment"
        id="appointmentTimeGap"
        name="appointmentTimeGap"
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
          <div className={`container-flex flex-wrap ${styles.radioselect}`}>
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
        options={genarateNegotiatorOptions()}
      />
    </>
  )
}

export const WebComponentConfigModalFooter = ({ closeModal }) => {
  const updating = useSelector(selectIsWebComponentUpdating)
  return (
    <>
      <Button className="mr-2" type="button" onClick={closeModal} variant="danger" fullWidth={true}>
        CANCEL
      </Button>
      <Button variant="primary" type="submit" fullWidth={true} loading={updating}>
        SAVE CHANGES
      </Button>
    </>
  )
}

export const WebComponentConfigModalInner = ({ config, closeModal }) => {
  const dispatch = useDispatch()
  const handleUpdateWebComponentConfig = updateWebComponentConfig(dispatch)
  const webComponentData = useSelector(selectIsWebComponentData)
  const loading = useSelector(selectIsWebComponentLoading)
  const clientId = useSelector(selectClientId) || ''

  const initialFormValues = (webComponentData || {
    appointmentLength: 30,
    appointmentTimeGap: 30,
    daysOfWeek: ['1', '2', '3', '4', '5', '6'],
  }) as FormikValues

  useEffect(handleFetchWebComponentConfig(dispatch, clientId), [])

  if (loading) return <Loader />
  return (
    <Formik initialValues={initialFormValues} onSubmit={handleUpdateWebComponentConfig}>
      {formikProps => (
        <Form>
          <ModalHeader title={config.title} />
          <ModalBody body={<WebComponentConfigModalBody subtext={config.subtext} formikProps={formikProps} />} />
          <ModalFooter footerItems={<WebComponentConfigModalFooter closeModal={closeModal} />} />
        </Form>
      )}
    </Formik>
  )
}

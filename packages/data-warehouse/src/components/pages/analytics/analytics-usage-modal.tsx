import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Button,
  Form,
  FormHeading,
  Formik,
  FormSection,
  FormSubHeading,
  Input,
  LevelRight,
  Loader,
  Modal,
} from '@reapit/elements'
import * as Yup from 'yup'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { MessageContext } from '../../../context/message-context'
import { SettingsModel } from '../../../types/settings'
import { handleGetSettings, handleUpdateSettings } from './analytics-handlers'

export interface AnalyticsUsageModalProps {
  visible: boolean
  handleClose: () => void
}

const AnalyticsUsageModal: React.FC<AnalyticsUsageModalProps> = ({ visible, handleClose }) => {
  const [settings, setSettings] = useState<SettingsModel>()
  const [settingsLoading, setSettingsLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)

  useEffect(handleGetSettings(setSettingsLoading, setSettings, connectSession), [connectSession])

  const onSubmit = useCallback(handleUpdateSettings(setSettingsLoading, setMessageState, handleClose), [])

  return (
    <Modal visible={visible} title="Data Warehouse Usage Cap" afterClose={handleClose}>
      {settingsLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={
            {
              monthlyUsageCap: settings?.monthlyUsageCap ?? 0,
            } as Partial<SettingsModel>
          }
          onSubmit={(settings: Partial<SettingsModel>) => {
            onSubmit(settings)
          }}
          validationSchema={Yup.object({
            monthlyUsageCap: Yup.number()
              .min(0, 'Usage number can be a min of 0 hours per month')
              .max(672, 'Usage number can be a max of 24hrs per day, 28 days a month'),
          })}
        >
          <Form className="form">
            <FormSection>
              <FormHeading>Usage Cap</FormHeading>
              <FormSubHeading>{`Your current usage cap is set at ${settings?.monthlyUsageCap ??
                0} hours per calendar month. You can adjust the usage limit with the form below.`}</FormSubHeading>
              <Input
                id="monthlyUsageCap"
                type="text"
                placeholder="Usage Cap"
                name="monthlyUsageCap"
                labelText="Usage Cap"
              />
              <LevelRight>
                <Button variant="secondary" type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </LevelRight>
            </FormSection>
          </Form>
        </Formik>
      )}
    </Modal>
  )
}

export default AnalyticsUsageModal

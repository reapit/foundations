import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Button,
  Form,
  FormHeading,
  Formik,
  FormSection,
  FormSubHeading,
  Helper,
  Input,
  LevelRight,
  Modal,
  useFormikContext,
} from '@reapit/elements'
import * as Yup from 'yup'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { MessageContext } from '../../../context/message-context'
import { SettingsModel } from '../../../types/settings'
import { getChargableUsageString, handleGetSettings, handleUpdateSettings } from './analytics-handlers'

export interface AnalyticsUsageModalProps {
  visible: boolean
  handleClose: () => void
}

export interface AnalyticsUsageNewProps {
  currentSettings?: Partial<SettingsModel>
}

export const NewUsageComponent: React.FC<AnalyticsUsageNewProps> = ({ currentSettings }) => {
  const { values } = useFormikContext<Partial<SettingsModel>>()

  if (!currentSettings) return null

  if (!Number(values.monthlyUsageCap) && currentSettings.monthlyUsageCap)
    return <p>Setting the monthly usage at 0 will mean charges are limited only by hours in a calendar month.</p>

  if (values.monthlyUsageCap !== currentSettings.monthlyUsageCap) {
    const newChargableUsage = getChargableUsageString(values)
    return (
      <p>
        Setting your usage cap to {values.monthlyUsageCap} hours will cap maximum monthly charges at {newChargableUsage}
      </p>
    )
  }

  return null
}

const AnalyticsUsageModal: React.FC<AnalyticsUsageModalProps> = ({ visible, handleClose }) => {
  const [settings, setSettings] = useState<SettingsModel>()
  // const [settingsLoading, setSettingsLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)

  useEffect(handleGetSettings(setSettings, connectSession), [connectSession])

  const onSubmit = useCallback(handleUpdateSettings(setSettings, setMessageState, handleClose), [])

  return (
    <Modal visible={visible} title="Data Warehouse Usage Cap" afterClose={handleClose}>
      <Formik
        initialValues={
          {
            monthlyUsageCap: settings?.monthlyUsageCap ?? 0,
          } as Partial<SettingsModel>
        }
        onSubmit={(settings: Partial<SettingsModel>) => {
          const monthlyUsageCap =
            settings.monthlyUsageCap && !isNaN(Number(settings.monthlyUsageCap)) ? Number(settings.monthlyUsageCap) : 0
          onSubmit({
            ...settings,
            monthlyUsageCap,
          })
        }}
        validationSchema={Yup.object({
          monthlyUsageCap: Yup.string()
            .required('Required')
            .test('is-nan', 'Only numbers permitted', (value) => !isNaN(Number(value)))
            .test('is-iteger', 'Only integers permitted', (value) => Boolean(/^\+?(0|[1-9]\d*)$/.test(value as string)))
            .test('is-0-or-above', 'Usage number can be a min of 0 hours per month', (value) => Number(value) >= 0)
            .test(
              'is-0-or-above',
              'Usage number can be a max of 24hrs per day, 28 days a month',
              (value) => Number(value) <= 672,
            ),
        })}
      >
        <Form className="form">
          <Helper variant="info">
            You are able to control your organisations monthly spend by applying limits to the uptime of your data
            warehouse. Your monthly subscription includes two hours per month of usage
          </Helper>
          <FormSection>
            <FormHeading>Usage Cap</FormHeading>
            <FormSubHeading>
              {settings?.monthlyUsageCap
                ? `Your current usage cap is set at ${
                    settings?.monthlyUsageCap ?? 0
                  } hours per calendar month, current cost ${getChargableUsageString(
                    settings,
                  )} per month. You can adjust the usage limit with the form below.`
                : 'No usage cap is currently set.'}
            </FormSubHeading>
            <FormSubHeading>
              <NewUsageComponent currentSettings={settings} />
            </FormSubHeading>
            <Input
              id="monthlyUsageCap"
              type="text"
              placeholder="Usage Cap"
              name="monthlyUsageCap"
              labelText="Usage Hours"
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
    </Modal>
  )
}

export default AnalyticsUsageModal

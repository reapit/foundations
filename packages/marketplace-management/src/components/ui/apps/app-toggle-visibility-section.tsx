import React, { Dispatch, SetStateAction, useState } from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Section, notification, H5 } from '@reapit/elements'
import { updateAppRestrictionsService } from '../../../services/apps'

export interface AppToggleVisibilityProps {
  app: AppSummaryModel
}

export const handleOnCheckboxChange = (
  setChecked: Dispatch<SetStateAction<boolean>>,
  appId: string,
  checked: boolean,
) => async () => {
  setChecked(!checked)

  const updatedAppRestrictions = await updateAppRestrictionsService({
    appId: appId,
    status: checked ? 'exclude' : 'include',
  })
  if (updatedAppRestrictions) {
    return notification.success({
      message: 'Successfully updated app restrictions',
      placement: 'bottomRight',
    })
  }

  notification.error({
    message: 'Failed to update app restrictions',
    placement: 'bottomRight',
  })

  setChecked(checked)
}

const AppToggleVisibilitySection: React.FC<AppToggleVisibilityProps> = ({ app }: AppToggleVisibilityProps) => {
  const [checked, setChecked] = useState(!app.isHidden)
  return (
    <Section>
      <H5>Application Visibility</H5>
      <p className="mb-4">
        <i>
          By default, all apps will be visible to all offices/users within your organisation. If you wish to hide an app
          from the Marketplace, please deselect. Hidden apps (apps that have been deselected) will not be visible in the
          Marketplace to any offices/users inside of your organisation.
        </i>
      </p>
      <div className="field field-checkbox mb-0 control">
        <input
          className="checkbox"
          type="checkbox"
          id={app.id}
          checked={checked}
          onChange={handleOnCheckboxChange(setChecked, app.id as string, checked)}
        />
        <label className="label" htmlFor={app.id}>
          Visible
        </label>
      </div>
    </Section>
  )
}

export default AppToggleVisibilitySection

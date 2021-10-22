import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { AppDetailModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { updateAppRestrictionsService } from '../../../services/apps'
import { BodyText, elMb11, InputGroup, Subtitle, useSnack } from '@reapit/elements'
import { useOrgId } from '../../../utils/use-org-id'

export interface AppToggleVisibilityProps {
  app: AppSummaryModel
  reFetchApp: () => Promise<AppDetailModel | undefined>
}

export const handleOnCheckboxChange =
  (
    setChecked: Dispatch<SetStateAction<boolean>>,
    reFetchApp: () => Promise<AppDetailModel | undefined>,
    appId: string,
    orgId: string | null,
    checked: boolean,
    success: (message: string) => void,
    error: (message: string) => void,
  ) =>
  async () => {
    if (!orgId) return

    setChecked(!checked)

    const updatedAppRestrictions = await updateAppRestrictionsService(
      {
        appId: appId,
        status: checked ? 'exclude' : 'include',
      },
      orgId,
    )
    if (updatedAppRestrictions) {
      await reFetchApp()
      return success('Successfully updated app restrictions')
    }

    error('Failed to update app restrictions')

    setChecked(checked)
  }

const AppToggleVisibilitySection: FC<AppToggleVisibilityProps> = ({ app, reFetchApp }: AppToggleVisibilityProps) => {
  const [checked, setChecked] = useState(!app.isHidden)
  const { success, error } = useSnack()
  const {
    orgIdState: { orgId },
  } = useOrgId()

  return (
    <>
      <Subtitle>Application Visibility</Subtitle>
      <BodyText hasGreyText>
        By default, all apps will be visible to all offices/users within your organisation. If you wish to hide an app
        from the Marketplace, please deselect. Hidden apps (apps that have been deselected) will not be visible in the
        Marketplace to any offices/users inside of your organisation.
      </BodyText>
      <InputGroup
        className={elMb11}
        label="Visible"
        type="checkbox"
        id={app.id}
        checked={checked}
        onChange={handleOnCheckboxChange(setChecked, reFetchApp, app.id as string, orgId, checked, success, error)}
      />
    </>
  )
}

export default AppToggleVisibilitySection

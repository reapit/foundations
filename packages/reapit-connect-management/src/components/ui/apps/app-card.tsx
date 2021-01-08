import React, { Dispatch, SetStateAction, useState } from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { LevelRight, notification, Tile } from '@reapit/elements'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import { AppRestriction } from '../../../types/app-restrictions'
import { updateAppRestrictionsService } from '../../../services/apps'
import { directAPI } from '../__styles__'

export interface AppCardProps {
  app: AppSummaryModel
  restriction?: AppRestriction
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

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

const AppCard: React.FC<AppCardProps> = ({ app, restriction }: AppCardProps) => {
  const [checked, setChecked] = useState(restriction?.status === 'include')
  return (
    <Tile
      heading={app.name || ''}
      subHeading={
        <>
          {app.developer || ''}
          {app.isDirectApi ? <span className={directAPI}>(Integration)</span> : ''}
        </>
      }
      image={<img className="image" src={app.iconUri || defaultAppIcon} alt={app.name} onError={onImageError} />}
    >
      <LevelRight>
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
      </LevelRight>
    </Tile>
  )
}

export default AppCard

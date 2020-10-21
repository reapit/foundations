import React, { FC /**  useState */ } from 'react'
import { IsSidebar } from './app-sections'
import { AppDetailSection } from './app-ui-helpers'
// import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel /** , InstallationModel */ } from '@reapit/foundations-ts-definitions'
// import { useParams } from 'react-router-dom'
// import { selectSboxInstallation } from '@/selector/installations'
// import { Dispatch } from 'redux'
import { FaCheck } from 'react-icons/fa'
import { check } from './__styles__/app-detail'
// import { installApp, uninstallApp } from '@/actions/installations'
// import { ToastMessage } from '@reapit/elements'

interface StatusSectionProps extends IsSidebar {
  appDetail: AppDetailModel
}

// const closeToast = (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => () => {
//   setVisible(false)
// }

// const handleInstallledCheckboxChange = (
//   isInstalledSboxState: boolean,
//   appId: string,
//   sboxInstallation: InstallationModel | undefined,
//   setToastVisible: React.Dispatch<React.SetStateAction<boolean>>,
//   setIsInstalledSbox: React.Dispatch<React.SetStateAction<boolean>>,
//   dispatch: Dispatch,
// ) => () => {
//   if (isInstalledSboxState && sboxInstallation) {
//     dispatch(
//       uninstallApp({
//         appId,
//         installationId: sboxInstallation.id as string,
//         terminatedReason: 'Terminated by developer from app detail page',
//         callback: () => setToastVisible(true),
//       }),
//     )
//   } else {
//     dispatch(
//       installApp({
//         appId,
//         callback: () => setToastVisible(true),
//       }),
//     )
//   }

//   setIsInstalledSbox(!isInstalledSboxState)
// }

export const StatusSection: FC<StatusSectionProps> = ({ appDetail, isSidebar }) => {
  const { isListed, authFlow } = appDetail
  // const sboxInstallation = useSelector(selectSboxInstallation)
  // const [isInstalledSboxState, setIsInstalledSbox] = useState<boolean>(Boolean(sboxInstallation))
  // const { appid } = useParams<{ appid: string }>()
  // const [toastVisible, setToastVisible] = useState<boolean>(false)
  // const dispatch = useDispatch()

  return (
    <>
      <AppDetailSection headerText="Authentication Flow" isSidebar={isSidebar}>
        {authFlow === 'clientCredentials' ? 'Client Credentials' : 'Authorization Code'}
      </AppDetailSection>
      <AppDetailSection headerText="Status" isSidebar={isSidebar}>
        <div>
          {isListed ? (
            <>
              <FaCheck className={check} /> Listed
            </>
          ) : (
            'Not listed'
          )}
        </div>
      </AppDetailSection>
      {/* <AppDetailSection headerText="Sandbox Installation" isSidebar={isSidebar}>
        <div className="field pt-2">
          <div className="control">
            <div className="field field-checkbox">
              <input
                className="checkbox"
                type="checkbox"
                id="is-installed"
                checked={isInstalledSboxState}
                value={isInstalledSboxState ? 1 : 0}
                onChange={handleInstallledCheckboxChange(
                  isInstalledSboxState,
                  appid,
                  sboxInstallation,
                  setToastVisible,
                  setIsInstalledSbox,
                  dispatch,
                )}
              />
              <label className="label" htmlFor="is-installed">
                {isInstalledSboxState ? 'Sandbox installed' : 'Install sandbox'}
              </label>
            </div>
          </div>
        </div>
      </AppDetailSection>
      <ToastMessage
        visible={toastVisible}
        message={`Successfully ${isInstalledSboxState ? '' : 'un'}installed app for sandbox`}
        variant="info"
        onCloseToast={closeToast(setToastVisible)}
      /> */}
    </>
  )
}

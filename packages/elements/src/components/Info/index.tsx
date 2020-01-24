import * as React from 'react'
import Alert from '../Alert'

export type InfoType =
  | '404'
  | 'CLIENT_APPS_EMPTY'
  | 'INSTALLED_APPS_EMPTY'
  | 'DEVELOPER_APPS_EMPTY'
  | 'ADMIN_APPROVALS_EMPTY'
  | 'DEVELOPER_EMPTY'
  | ''

export interface InfoProps {
  infoType: InfoType
}

export const infoText = (infoType: InfoType) => {
  switch (infoType) {
    case '404':
      return 'Page not found'
    case 'CLIENT_APPS_EMPTY':
      return 'We are sorry, there are no apps listed compatible with your account'
    case 'INSTALLED_APPS_EMPTY':
      return (
        'It looks like you haven’t installed any Apps yet. Have a look at what’s available by ' +
        'clicking ‘Browse’ from the menu.'
      )
    case 'DEVELOPER_APPS_EMPTY':
      return (
        'It looks like you haven’t submitted an App yet . When you’re ready, click on ‘Submit’ ' +
        'from the menu to get started.'
      )
    case 'ADMIN_APPROVALS_EMPTY':
      return 'There are no updates that require approval'
    case 'DEVELOPER_EMPTY':
      return 'Unfortunately, there are no results that match your search criteria, please try again'
    default:
      return ''
  }
}

export const Info: React.SFC<InfoProps> = ({ infoType, children }) => (
  <Alert type={infoType === '404' ? 'danger' : 'info'} message={infoText(infoType)}>
    {children}
  </Alert>
)

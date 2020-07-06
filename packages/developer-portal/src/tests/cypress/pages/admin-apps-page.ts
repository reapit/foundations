import routes from '@/constants/routes'
import api from '../fixtures/routes'

const adminAppMetaData = {
  url: routes.ADMIN_APPS,
  selectors: {
    listAppTr: 'table>tbody>tr',
    buttonSubmit: 'button[type=submit]',
    buttonRefresh: 'button[type=button]',
  },
  apiGetAppList: `${api.apps}?**`,
}

const adminAppPage = {
  ...adminAppMetaData,
}

export default adminAppPage

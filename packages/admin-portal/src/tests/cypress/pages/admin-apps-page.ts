import Routes from '@/constants/routes'
import api from '../fixtures/routes'

const adminAppMetaData = {
  url: Routes.APPS,
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

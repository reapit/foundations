import routes from '@/constants/routes'
import api from '../fixtures/routes'
import { APPS_PER_PAGE } from '@/constants/paginator'

const adminAppMetaData = {
  url: routes.ADMIN_APPS,
  selectors: {
    listAppTr: 'table>tbody>tr',
    buttonSubmit: 'button[type=submit]',
    buttonRefresh: 'button[type=button]'
  },
  apiGetAppList: `${api.apps}?**`
}

const adminAppPage = {
  ...adminAppMetaData,
  actions: {
    parseXHRBody: xhr => xhr.responseBody.text().then(res => JSON.parse(res))
  }
}

export default adminAppPage

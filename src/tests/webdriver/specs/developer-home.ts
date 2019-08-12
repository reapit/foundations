import DeveloperHomePage from '../page-objects/developer-home'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

const ITEMS_PER_PAGE = 4

describe('DeveloperHomePage', () => {
  beforeEach(() => {
    DeveloperHomePage.open()
  })

  // TODO - update later due to missing value from redux store when 2e2 is executed. this page need to fetch data by developerId
  // which is getting from store right now.

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

import { useConnectSession } from '../../components/hooks/connect-session'
import { useAppWithPages } from '../../components/hooks/apps/use-app'
import { usePageId } from '../../components/hooks/use-page-id'
import { Page } from '../../components/hooks/apps/fragments'
import { IconNames, NavResponsiveOption } from '@reapit/elements'

type PageGroup = Record<'create' | 'update' | 'list', Page[]>

const entityNameToIcon = (entityName: Page['entityName']): IconNames => {
  switch (entityName) {
    case 'applicant':
      return 'resultsMenu'
    case 'appointment':
      return 'mapMenu'
    case 'company':
      return 'accountMenu'
    case 'contact':
      return 'profileMenu'
    case 'negotiator':
      return 'usersMenu'
    case 'offer':
      return 'marketplaceMenu'
    case 'office':
      return 'officesMenu'
    case 'property':
      return 'defaultMenu'
    case 'propertyimage':
      return 'defaultMenu'
    default:
      return 'helpMenu'
  }
}

type PageGroups = Record<Page['entityName'], PageGroup>

const getPagesByEntity = (pages: Page[]): PageGroups => {
  const pagesByEntity = {} as PageGroups
  pages.forEach((page) => {
    if (!pagesByEntity[page.entityName]) {
      pagesByEntity[page.entityName] = {
        create: [],
        update: [],
        list: [],
      }
    }
    pagesByEntity[page.entityName][page.pageType].push(page)
  })
  return pagesByEntity
}

type NavOptionWithPageId = Omit<NavResponsiveOption, 'subItems'> & { pageId: string; subItems?: NavOptionWithPageId[] }

const pagesToNavConfig = (pagesByEntity: PageGroups, setPageId: (pageId: string) => void): NavOptionWithPageId[] => {
  return Object.entries(pagesByEntity).map(([entityName, pageGroup], idx) => {
    const subPages = [...(pageGroup.list || []), ...(pageGroup.create || [])]
    const [defaultPage] = subPages

    const itemIndex = idx + 1
    return {
      itemIndex,
      text: entityName,
      pageId: defaultPage.id,
      iconId: entityNameToIcon(entityName.toLowerCase() as Page['entityName']),
      subItems: subPages.map((subpage, idx) => ({
        itemIndex: idx,
        pageId: subpage.id,
        text: `${subpage.pageType} ${subpage.entityName}`,
        callback: () => setPageId(subpage.id),
      })),
      callback: () => setPageId(defaultPage.id),
    }
  })
}

const getNavIndex = (navOptions: NavOptionWithPageId[], pageId: string): { navIndex: number; navSubIndex: number } => {
  const topLevel = navOptions.find((item) => item.pageId === pageId || item.subItems?.find((i) => i.pageId === pageId))
  const subLevel = topLevel?.subItems?.find((item) => item.pageId === pageId)

  return {
    navIndex: topLevel?.itemIndex || 0,
    navSubIndex: subLevel?.itemIndex || 0,
  }
}

export const useNavConfig = () => {
  const { appId, pageId, setPageId } = usePageId()
  const { app, loading } = useAppWithPages(appId)
  const connectSession = useConnectSession()

  const pageGroups = app && getPagesByEntity(app.pages)

  const options = pageGroups
    ? pagesToNavConfig(pageGroups, (pageId) => {
        setPageId(pageId)
      })
    : []
  const { navIndex, navSubIndex } = pageGroups ? getNavIndex(options, pageId) : { navIndex: 0, navSubIndex: 0 }
  const subItems = options.find((opt) => opt.itemIndex === navIndex)?.subItems

  if (loading || !pageGroups || !connectSession) {
    return {
      loading,
    }
  }

  const opts: (NavOptionWithPageId | NavResponsiveOption)[] = [
    {
      itemIndex: 0,
      callback: () => {
        setPageId('')
      },
    },
    ...options,
    {
      itemIndex: options.length + 1,
      text: 'Logout',
      iconId: 'logoutMenu',
      isSecondary: true,
      callback: () => {
        connectSession.connectLogoutRedirect()
      },
    },
  ]

  return {
    navIndex,
    navSubIndex,
    subItems,
    options: opts,
  }
}

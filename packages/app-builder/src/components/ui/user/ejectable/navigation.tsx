import { usePageId } from '@/components/hooks/use-page-id'
import React, { forwardRef, useState } from 'react'
import { Loader, NavResponsive, ElNavContainer, NavResponsiveOption, IconNames } from '@reapit/elements'
import { useConnectSession } from '@/components/hooks/connect-session'
import { useAppWithPages } from '@/components/hooks/apps/use-app'
import { Page } from '@/components/hooks/apps/fragments'

export type NavigationProps = {}

type PageGroup = Record<'create' | 'update' | 'list', Page[]>

const entityNameToIcon = (entityName: Page['entityName']): IconNames => {
  switch (entityName) {
    case 'applicant':
      return 'accountMenu'
    case 'appointment':
      return 'geoLocationSolidSystem'
    case 'company':
      return 'companySystem'
    case 'contact':
      return 'phoneSystem'
    case 'negotiator':
      return 'walkingSolidSystem'
    case 'offer':
      return 'marketplaceMenu'
    case 'office':
      return 'officesMenu'
    case 'property':
      return 'geoLocationSolidSystem'
    default:
      return 'defaultMenu'
  }
}

const pagesToNavConfig = (
  pages: Array<Page>,
  callback: (pageId: string, itemIndex: number, secondaryItemIndex: number) => void,
): NavResponsiveOption[] => {
  const pagesByEntity: Record<Page['entityName'], PageGroup> = {} as Record<Page['entityName'], PageGroup>
  pages.forEach((page) => {
    if (!pagesByEntity[page.entityName]) {
      pagesByEntity[page.entityName] = {
        create: [],
        update: [],
        list: [],
      }
    }
    console.log(pagesByEntity[page.entityName], page.pageType)
    pagesByEntity[page.entityName][page.pageType].push(page)
  })

  return Object.entries(pagesByEntity).map(([entityName, pageGroup], idx) => {
    const defaultPage = pageGroup.list[0]
    const itemIndex = idx + 1
    return {
      itemIndex,
      text: entityName,
      iconId: entityNameToIcon(entityName as Page['entityName']),
      subItems: Object.values(pageGroup)
        .flat()
        .map((subpage, idx) => {
          return {
            itemIndex: idx,
            text: `${subpage.pageType} ${subpage.entityName}`,
            callback: () => {
              callback(defaultPage.id, itemIndex, idx)
            },
          }
        }),
      callback: () => {
        callback(defaultPage.id, itemIndex, 0)
      },
    }
  })
}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>((_, ref) => {
  const { appId, setPageId } = usePageId()
  const { app, loading } = useAppWithPages(appId)
  const connectSession = useConnectSession()

  const [defaultNavIndex, setDefaultNavIndex] = useState(0)
  const [defaultNavSubIndex, setDefaultNavSubIndex] = useState(0)

  if (loading || !app?.pages || !connectSession) {
    return <Loader />
  }

  const options = pagesToNavConfig(app.pages, (pageId, itemIndex, secondaryItemIndex) => {
    setPageId(pageId)
    setDefaultNavIndex(itemIndex)
    setDefaultNavSubIndex(secondaryItemIndex)
  })

  return (
    <ElNavContainer ref={ref} style={{ overflow: 'visible' }}>
      <NavResponsive
        style={{ flex: 1 }}
        defaultNavIndex={defaultNavIndex}
        defaultNavSubIndex={defaultNavSubIndex}
        options={[
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
        ]}
      />
    </ElNavContainer>
  )
})

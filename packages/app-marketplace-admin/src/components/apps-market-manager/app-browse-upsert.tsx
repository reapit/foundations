import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import {
  Button,
  elMb3,
  FlexContainer,
  Icon,
  Loader,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
  Subtitle,
  Title,
  useModal,
} from '@reapit/elements'
import { AppsBrowseConfigEnum, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, useEffect, useState } from 'react'
import { openNewPage, ExternalPages } from '../../utils/navigation'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppBrowseManageTable } from './app-browse-manage-table'
import { AppBrowseUpsertModal } from './app-browse-upsert-modal'

export const AppBrowseUpsert: FC<{}> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [items, setItems] = useState<AppsBrowseConfigItemInterface[]>([])
  const [configType, setConfigType] = useState<AppsBrowseConfigEnum | undefined>(undefined)
  const [selectedItem, setSelectedItem] = useState<AppsBrowseConfigItemInterface | undefined>(undefined)
  const { modalIsOpen, closeModal, openModal } = useModal('upsert-app-marketing')

  const [appMarketPlaceCmsConfig, appMarketPlaceCmsLoading] = useReapitGet<{
    items: AppsBrowseConfigItemInterface[]
  }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppMarketAdmin],
    fetchWhenTrue: [connectSession],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  useEffect(() => {
    if (appMarketPlaceCmsConfig && appMarketPlaceCmsConfig.items) {
      setItems(appMarketPlaceCmsConfig.items)
    }
  }, [appMarketPlaceCmsConfig])

  useEffect(() => {
    if (configType !== undefined || selectedItem !== undefined) {
      openModal()
    } else {
      closeModal()
    }
  }, [configType, selectedItem])
  useEffect(() => {
    if (configType && !modalIsOpen) setConfigType(undefined)
    if (selectedItem && !modalIsOpen) setSelectedItem(undefined)
  }, [modalIsOpen])

  const deleteItem = (type: AppsBrowseConfigEnum, id: string) => {
    setItems([...items.filter((item) => item.id !== id)])
  }
  const upsertItem = (item: AppsBrowseConfigItemInterface) => {
    setItems([...items.filter((i) => i.id !== item.id), item])
  }

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>AppMarket Admin</Title>
        <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
        <Subtitle>Marketplace Admin Docs</Subtitle>
        <SmallText hasGreyText>
          Praesent nec viverra nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sem nunc,
          tincidunt vestibulum metus quis, rutrum fringilla urna. Curabitur ipsum tortor, efficitur eget egestas non,
          condimentum semper nisl.
        </SmallText>
        <Button onClick={openNewPage(ExternalPages.appMarketplaceAdminDocs)}>View Docs</Button>
      </SecondaryNavContainer>
      <PageContainer>
        <Title>AppMarket Configuration Table</Title>
        {appMarketPlaceCmsLoading ? (
          <Loader />
        ) : (
          Object.values(AppsBrowseConfigEnum).map((type) => (
            <AppBrowseManageTable
              key={`${type}`}
              type={type}
              items={items.filter((item) => item.configType === type)}
              setEditType={() => setConfigType(type)}
              setSelectedItem={setSelectedItem}
              connectSession={connectSession as ReapitConnectSession}
              deleteItem={deleteItem}
            />
          ))
        )}
        <AppBrowseUpsertModal
          modalIsOpen={typeof configType !== 'undefined'}
          defaultValues={{ configType: configType as AppsBrowseConfigEnum } as AppsBrowseConfigItemInterface}
          closeModal={closeModal}
          connectSession={connectSession as ReapitConnectSession}
          upsertItem={upsertItem}
        />
        {selectedItem && (
          <AppBrowseUpsertModal
            modalIsOpen={typeof selectedItem !== 'undefined'}
            closeModal={closeModal}
            connectSession={connectSession as ReapitConnectSession}
            defaultValues={selectedItem as AppsBrowseConfigItemInterface}
            upsertItem={upsertItem}
          />
        )}
      </PageContainer>
    </FlexContainer>
  )
}

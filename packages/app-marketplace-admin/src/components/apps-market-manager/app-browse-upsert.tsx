import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Loader, PageContainer, Title, useModal } from '@reapit/elements'
import { AppsBrowseConfigEnum, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, useEffect, useState } from 'react'
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
    setItems({
      ...items,
      [type]: items[type].filter((item) => item.id !== id),
    })
  }
  const upsertItem = (item: AppsBrowseConfigItemInterface) => {
    setItems([...items.filter((i) => i.id !== item.id), item])
  }

  return (
    <PageContainer>
      <Title>AppMarket Admin</Title>
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
        configType={configType || (selectedItem?.configType as AppsBrowseConfigEnum)}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        connectSession={connectSession as ReapitConnectSession}
        appMarketConfig={selectedItem}
        upsertItem={upsertItem}
      />
    </PageContainer>
  )
}

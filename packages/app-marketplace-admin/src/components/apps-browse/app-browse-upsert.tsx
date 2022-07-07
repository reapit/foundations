import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Loader, PageContainer, Title, useModal } from '@reapit/elements'
import { AppsBrowseConfigEnum, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, useEffect, useState } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppBrowseTable } from './app-browse-table'
import { AppBrowseUpsertModal } from './app-browse-upsert-modal'

export const AppBrowseUpsert: FC<{}> = () => {
  const appsBrowseConfigKeys: { [key in AppsBrowseConfigEnum]: AppsBrowseConfigItemInterface[] } = Object.values(
    AppsBrowseConfigEnum,
  ).reduce<{
    [key in AppsBrowseConfigEnum]: []
  }>((ob, key) => {
    ob[key] = []

    return ob
  }, {} as { [key in AppsBrowseConfigEnum] })
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [items, setItems] =
    useState<{ [k in AppsBrowseConfigEnum]: AppsBrowseConfigItemInterface[] }>(appsBrowseConfigKeys)
  const [configType, setConfigType] = useState<AppsBrowseConfigEnum | undefined>(undefined)
  const [selectedItem, setSelectedItem] = useState<AppsBrowseConfigItemInterface | undefined>(undefined)
  const { modalIsOpen, closeModal, openModal } = useModal('upsert-app-marketing')

  const [appMarketPlaceCmsConfig, appMarketPlaceCmsLoading, , refresh] = useReapitGet<{
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
      console.log(
        'setting items,',
        appMarketPlaceCmsConfig.items.reduce((configItems, config) => {
          if (!configItems[config.configType].map((i) => i.id).includes(config.id)) {
            configItems[config.configType].push(config)
          }

          return configItems
        }, items),
      )
      setItems(
        appMarketPlaceCmsConfig.items.reduce((configItems, config) => {
          if (!configItems[config.configType].map((i) => i.id).includes(config.id)) {
            configItems[config.configType].push(config)
          }

          return configItems
        }, items),
      )
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
    if (configType) setConfigType(undefined)
    if (selectedItem) setSelectedItem(undefined)
  }, [modalIsOpen])

  // useEffect(() => console.log('items', items), [items])

  console.log('items in flow', items)

  return (
    <PageContainer>
      <Title>AppMarket Admin</Title>
      {appMarketPlaceCmsLoading ? (
        <Loader />
      ) : (
        items &&
        (Object.values(AppsBrowseConfigEnum) as AppsBrowseConfigEnum[]).map((type) => (
          <AppBrowseTable
            key={`${type}-${items[type].map((item) => item.id).join('-')}`}
            type={type}
            items={items[type]}
            setEditType={() => setConfigType(type)}
            setSelectedItem={setSelectedItem}
            connectSession={connectSession as ReapitConnectSession}
          />
        ))
      )}
      <AppBrowseUpsertModal
        configType={configType as AppsBrowseConfigEnum}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        connectSession={connectSession as ReapitConnectSession}
        appMarketConfig={selectedItem}
      />
    </PageContainer>
  )
}

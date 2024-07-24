import React, { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { PagedCustomersModel, PagedRulesModel, PagedIpsModel } from '../../types/network'

export interface NetworkSelected {
  ruleId: string | null
  ipRuleId: string | null
  ipId: string | null
}

export interface NetworkState {
  customers: PagedCustomersModel | null
  rules: PagedRulesModel | null
  ips: PagedIpsModel | null
  refreshRules: () => void
  refreshIps: () => void
  customersLoading: boolean
  rulesLoading: boolean
  ipsLoading: boolean
  customerId: string | null
  networkSelected: NetworkSelected
  setNetworkSelected: Dispatch<SetStateAction<NetworkSelected>>
  ipsPageNumber: number
  setIpsPageNumber: Dispatch<SetStateAction<number>>
}

export const handleModalAction =
  (
    setNetworkSelected: Dispatch<SetStateAction<NetworkSelected>>,
    modalAction: () => void,
    key: keyof NetworkSelected,
    selectedItem?: string | null,
  ) =>
  () => {
    setNetworkSelected((networkSelected) => ({
      ...networkSelected,
      [key]: selectedItem ? selectedItem : null,
    }))
    modalAction()
  }

export const NetworkStateContext = createContext<NetworkState>({} as NetworkState)

const { Provider } = NetworkStateContext

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [ipsPageNumber, setIpsPageNumber] = useState<number>(1)

  const [networkSelected, setNetworkSelected] = useState<NetworkSelected>({
    ruleId: null,
    ipRuleId: null,
    ipId: null,
  })

  const organisationId = connectSession?.loginIdentity?.orgId

  const [customers, customersLoading] = useReapitGet<PagedCustomersModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDwCustomers],
    queryParams: { organisationId, pageSize: 999 },
    fetchWhenTrue: [organisationId],
  })

  const customerId = customers?._embedded?.[0]?.id || null

  const [rules, rulesLoading, , refreshRules] = useReapitGet<PagedRulesModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getRules],
    queryParams: { pageSize: 999 },
    fetchWhenTrue: [customerId],
    uriParams: { customerId },
  })

  const ruleId = networkSelected.ruleId

  const [ips, ipsLoading, , refreshIps] = useReapitGet<PagedIpsModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getIps],
    queryParams: { pageSize: 1, pageNumber: ipsPageNumber },
    fetchWhenTrue: [customerId, ruleId],
    uriParams: { customerId, ruleId },
  })

  return (
    <Provider
      value={{
        customers,
        rules,
        ips,
        refreshRules,
        refreshIps,
        customersLoading,
        rulesLoading,
        ipsLoading,
        customerId,
        networkSelected,
        setNetworkSelected,
        ipsPageNumber,
        setIpsPageNumber,
      }}
    >
      {children}
    </Provider>
  )
}

export const useNetworkState = (): NetworkState => {
  return useContext(NetworkStateContext)
}

import { PaymentModel } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
// import { useReapitConnect } from '@reapit/connect-session'
// import { GetActionNames, getActions } from '@reapit/utils-common'
// import { useReapitGet } from '@reapit/utils-react'
// import { reapitConnectBrowserSession } from './connect-session'
// import { useSnack } from '@reapit/elements'
// import { useHistory } from 'react-router'

export interface PaymentsDataState {
  selectedPayment: PaymentModel | null
  setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>
}

export interface PaymentsFilters {
  createdFrom?: string
  createdTo?: string
  description?: string
  status?: string
}

export interface PaymentsFilterState {
  paymentsFilters: PaymentsFilters
  setPaymentsFilters: Dispatch<SetStateAction<PaymentsFilters>>
}

export interface PaymentsStateHook {
  paymentsDataState: PaymentsDataState
  paymentsFilterState: PaymentsFilterState
}

export const PaymentsStateContext = createContext<PaymentsStateHook>({} as PaymentsStateHook)

const { Provider } = PaymentsStateContext

export const PaymentsProvider: FC = ({ children }) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentModel | null>(null)
  const [paymentsFilters, setPaymentsFilters] = useState<PaymentsFilters>({})
  // const history = useHistory()
  // const { error } = useSnack()
  // const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  // const developerId = connectSession?.loginIdentity.developerId
  // const email = connectSession?.loginIdentity.email

  // const [members, , , refreshMembers] = useReapitGet<MemberModelPagedResult>({
  //   reapitConnectBrowserSession,
  //   action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloperMembers],
  //   queryParams: { email: encodeURIComponent(email ?? ''), pageSize: 1 },
  //   uriParams: { developerId },
  //   fetchWhenTrue: [email, developerId],
  //   onError: handlePermissionError(error, history),
  // })

  // const [currentDeveloper, , , refreshCurrentDeveloper] = useReapitGet<DeveloperModel>({
  //   reapitConnectBrowserSession,
  //   action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloper],
  //   uriParams: { developerId },
  //   fetchWhenTrue: [developerId],
  //   onError: handlePermissionError(error, history),
  // })

  const paymentsDataState: PaymentsDataState = {
    selectedPayment,
    setSelectedPayment,
  }

  const paymentsFilterState: PaymentsFilterState = {
    paymentsFilters,
    setPaymentsFilters,
  }

  return (
    <Provider
      value={{
        paymentsDataState,
        paymentsFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const usePaymentsState = (): PaymentsStateHook => {
  return useContext(PaymentsStateContext)
}

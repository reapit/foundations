import * as React from 'react'
import { H5, Grid, H6, GridItem, DATE_TIME_FORMAT, Section } from '@reapit/elements'
import CostFilterForm from './cost-filter-form'
import dayjs from 'dayjs'
import CostExplorerTable from './cost-explorer-table'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchMonthlyBilling } from '@/actions/developer'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getDeveloperIdFromConnectSession } from '@/utils/session'

export type CostExplorerProps = {}

export type CostFilterFormValues = {
  createdMonth: string
}

export const prepareFilterFormInitialValues = (createdMonth: string) => {
  return (): CostFilterFormValues => {
    return {
      createdMonth,
    }
  }
}

interface HandleOnSave {
  setCreatedMonth: (createdMonth: string) => void
  dispatch: Dispatch
  developerId: string
}

export const handleOnSave = ({ setCreatedMonth, dispatch, developerId }: HandleOnSave) => {
  return (values: CostFilterFormValues) => {
    const { createdMonth } = values
    setCreatedMonth(createdMonth)
    const month = dayjs(createdMonth).format(DATE_TIME_FORMAT.YYYY_MM)
    dispatch(fetchMonthlyBilling({ month, developerId }))
  }
}

interface HandleFetchMonthlyBilling {
  month: string
  developerId: string
  dispatch: Dispatch
}

export const handleFetchMonthlyBilling = ({ dispatch, month, developerId }: HandleFetchMonthlyBilling) => () => {
  developerId && month && dispatch(fetchMonthlyBilling({ month, developerId }))
}

const CostExplorer: React.FC<CostExplorerProps> = () => {
  const dispatch = useDispatch()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = getDeveloperIdFromConnectSession(connectSession)
  const [createdMonth, setCreatedMonth] = React.useState(dayjs().format(DATE_TIME_FORMAT.YYYY_MM))
  const initialValues = React.useMemo(prepareFilterFormInitialValues(createdMonth), [createdMonth])

  React.useEffect(handleFetchMonthlyBilling({ month: createdMonth, developerId, dispatch }), [developerId])

  const onSave = React.useCallback(handleOnSave({ setCreatedMonth, dispatch, developerId }), [developerId, dispatch])

  return (
    <Section hasMargin={false}>
      <H5>Cost Explorer: Cost & Usage</H5>
      <Grid>
        <GridItem className="is-half-desktop">
          <Grid>
            <GridItem className="is-one-quarter">
              <H6>Month</H6>
            </GridItem>
            <GridItem>
              <CostFilterForm initialValues={initialValues} onSave={onSave} />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <CostExplorerTable />
        </GridItem>
      </Grid>
    </Section>
  )
}
export default CostExplorer

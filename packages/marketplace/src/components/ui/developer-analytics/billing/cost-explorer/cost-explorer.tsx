import * as React from 'react'
import { H4, Grid, H6, GridItem, DATE_TIME_FORMAT } from '@reapit/elements'
import CostFilterForm from './cost-filter-form'
import dayjs from 'dayjs'
import CostExplorerTable from './cost-explorer-table'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchMonthlyBilling } from '@/actions/developer'
import { selectDeveloperApps } from '@/selector'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

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
  myAppIds: string[]
}

export const handleOnSave = ({ setCreatedMonth, dispatch, myAppIds }: HandleOnSave) => {
  return (values: CostFilterFormValues) => {
    const { createdMonth } = values
    setCreatedMonth(createdMonth)
    const month = dayjs(createdMonth).format(DATE_TIME_FORMAT.YYYY_MM)
    dispatch(fetchMonthlyBilling({ month, applicationId: myAppIds }))
  }
}

interface HandleFetchMonthlyBilling {
  month: string
  applicationId: string[]
  dispatch: Dispatch
}

export const handleFetchMonthlyBilling = ({ dispatch, month, applicationId }: HandleFetchMonthlyBilling) => () => {
  dispatch(fetchMonthlyBilling({ month, applicationId }))
}

const CostExplorer: React.FC<CostExplorerProps> = () => {
  const dispatch = useDispatch()
  const myApps = useSelector(selectDeveloperApps)
  const myAppIds = myApps.map((item: AppSummaryModel) => item.id) as string[]

  const [createdMonth, setCreatedMonth] = React.useState(dayjs().format(DATE_TIME_FORMAT.YYYY_MM))
  const initialValues = React.useMemo(prepareFilterFormInitialValues(createdMonth), [createdMonth])

  React.useEffect(handleFetchMonthlyBilling({ month: createdMonth, applicationId: myAppIds, dispatch }), [
    myApps.length,
  ])

  const onSave = React.useCallback(handleOnSave({ setCreatedMonth, dispatch, myAppIds }), [myAppIds, dispatch])

  return (
    <>
      <H4>Cost Explorer: Cost & Usage</H4>
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
    </>
  )
}
export default CostExplorer

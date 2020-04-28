import * as React from 'react'
import { H4, Grid, H6, GridItem, DATE_TIME_FORMAT } from '@reapit/elements'
import CostFilterForm from './cost-filter-form'
import dayjs from 'dayjs'

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

export const handleOnSave = (setCreatedMonth: (createdMonth: string) => void) => {
  return (values: CostFilterFormValues) => {
    const { createdMonth } = values
    setCreatedMonth(createdMonth)
  }
}

const CostExplorer: React.FC<CostExplorerProps> = () => {
  const [createdMonth, setCreatedMonth] = React.useState(dayjs().format(DATE_TIME_FORMAT.YYYY_MM))
  const initialValues = React.useMemo(prepareFilterFormInitialValues(createdMonth), [createdMonth])
  const onSave = React.useCallback(handleOnSave(setCreatedMonth), [])
  return (
    <>
      <H4>Cost Explorer: Cost & Usage</H4>
      <Grid>
        <GridItem className="is-one-quarter">
          <H6>Month</H6>
        </GridItem>
        <GridItem>
          <CostFilterForm initialValues={initialValues} onSave={onSave} />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>{createdMonth}</GridItem>
      </Grid>
    </>
  )
}
export default CostExplorer

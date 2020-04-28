import * as React from 'react'
import { H4, Grid, GridItem, H6 } from '@reapit/elements'
import styles from '@/styles/pages/analytics.scss?mod'

export type TransactionHistoryProps = {}

const TransactionHistory: React.FC<TransactionHistoryProps> = () => {
  return (
    <div>
      <H4>Transaction History</H4>
      <div className={styles.transactionSection}>
        <H6>This Months Transactions</H6>
        <Grid>
          <GridItem className="is-one-third">April 2020</GridItem>
          <GridItem>
            <a href="#">Download</a>
          </GridItem>
        </Grid>
      </div>
      <div className={styles.transactionSection}>
        <H6>Previous Transactions</H6>
        <Grid>
          <GridItem className="is-one-third">March 2020</GridItem>
          <GridItem>
            <a href="#">Download</a>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem className="is-one-third">February 2020</GridItem>
          <GridItem>
            <a href="#">Download</a>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem className="is-one-third">January 2020</GridItem>
          <GridItem>
            <a href="#">Download</a>
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default TransactionHistory

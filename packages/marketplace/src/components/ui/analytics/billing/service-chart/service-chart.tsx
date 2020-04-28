import React from 'react'
import { Bar } from 'react-chartjs-2'
import { H4, H5, FlexContainerResponsive } from '@reapit/elements'
import styles from '@/styles/pages/analytics.scss?mod'

export const ServiceChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'First',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        hoverBackgroundColor: 'red',
        hoverBorderColor: 'red',
        data: [10, 5, 10, 20],
      },
      {
        label: 'Last',
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
        hoverBackgroundColor: 'green',
        hoverBorderColor: 'green',
        data: [3, 1, 100, 200],
      },
    ],
  }
  return (
    <FlexContainerResponsive hasPadding className={styles.serviceChart}>
      <div className={styles.barChartContainer}>
        <H4>Services</H4>
        <Bar
          data={data}
          width={50}
          height={50}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className={styles.transactionHistoryContainer}>
        <H4>Transaction History</H4>
        <H5>This month transaction</H5>
        <FlexContainerResponsive className={styles.downloadSection}>
          <div>April 2020</div>
          <a>Download</a>
        </FlexContainerResponsive>
        <H5>Previous transaction</H5>
        <FlexContainerResponsive className={styles.downloadSection}>
          <div>March 2020</div>
          <a>Download</a>
        </FlexContainerResponsive>
        <FlexContainerResponsive className={styles.downloadSection}>
          <div>Feb 2020</div>
          <a>Download</a>
        </FlexContainerResponsive>
      </div>
    </FlexContainerResponsive>
  )
}

export default ServiceChart

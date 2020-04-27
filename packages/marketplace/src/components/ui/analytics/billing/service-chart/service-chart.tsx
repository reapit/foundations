import React from 'react'
import { Bar } from 'react-chartjs-2'
import { H4, H5, FlexContainerResponsive } from '@reapit/elements'
import styles from '@/styles/pages/analytics.scss?mod'

// TODO will replace mock data when have API
const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Resource',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [10, 5, 10, 20],
    },
  ],
}

export const ServiceChart: React.FC = () => {
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
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Total cost',
                  },
                },
              ],
            },
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

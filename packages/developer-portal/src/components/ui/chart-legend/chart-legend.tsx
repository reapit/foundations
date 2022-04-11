import * as React from 'react'
import { Chart } from 'chart.js'
import { GridItem, Grid } from '@reapit/elements-legacy'
import { cx } from '@linaria/core'

export type ChartLegendItem = {
  text: string
  fillStyle: string
  strokeStyle: string
  lineWidth: number
  datasetIndex: number
  hidden: boolean
}

export type ChartLegendProps = {
  chartInstance: Partial<Chart>
  chartLegendItems: ChartLegendItem[]
}

// Follow the default implementation of ChartJS's legend onClick action
// https://www.chartjs.org/docs/latest/configuration/legend.html#custom-on-click-actions
export const onChartLegendItemClick = (chartInstance: Partial<Chart>, chartLegendItem: ChartLegendItem) => {
  return () => {
    if (!chartLegendItem) {
      return
    }
    const index = chartLegendItem.datasetIndex
    if (chartInstance.getDatasetMeta) {
      const currentDatasetMeta = chartInstance.getDatasetMeta(index)
      if (currentDatasetMeta) {
        const isCurrentDatasetHidden = currentDatasetMeta.hidden
        currentDatasetMeta.hidden = !isCurrentDatasetHidden
        // Need to call update() to rerender the chart
        chartInstance.update && chartInstance.update()
        // Also need to call generateLegend again to update our legendItems in legendCallback function
        // https://www.chartjs.org/docs/latest/configuration/legend.html#html-legends
        // chartInstance.generateLegend && chartInstance()
      }
    }
  }
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ chartInstance, chartLegendItems }) => {
  return (
    <Grid>
      {chartLegendItems.map((legendItem) => {
        const { text, fillStyle, strokeStyle, lineWidth, datasetIndex, hidden } = legendItem
        return (
          <GridItem
            key={datasetIndex}
            className="cursor-pointer"
            onClick={onChartLegendItemClick(chartInstance, legendItem)}
          >
            <Grid isVerticalCentered isMobile>
              <GridItem className="is-one-third-desktop is-half-tablet is-one-third-mobile">
                <div
                  className="chartLegendBox"
                  style={{
                    backgroundColor: fillStyle,
                    borderWidth: lineWidth,
                    borderColor: strokeStyle,
                  }}
                />
              </GridItem>
              <GridItem className="px-0">
                <p className={cx('is-size-7', hidden && 'text-line-through')}>{text}</p>
              </GridItem>
            </Grid>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default ChartLegend

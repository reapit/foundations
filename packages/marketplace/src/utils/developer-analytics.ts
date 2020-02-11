import dayjs from 'dayjs'
import orderBy from 'lodash.orderby'
import { InstallationModelWithAppName } from '@/components/pages/analytics'

export interface InstallationModelWithDateObject extends InstallationModelWithAppName {
  createdDate: Date
}

export type GrouppedAppsByDate = {
  [key: string]: Array<InstallationModelWithDateObject>
}

/**
 * Group installed apps by created date, order by created date.
 * For example if input data look like
 * [
 *  {appName: 'app1', created: '01/01/2020', ... },
 *  {appName: 'app2', created: '02/01/2020', ... },
 *  {appName: 'app3', created: '02/01/2020', ... },
 * {appName: 'app4', created: '04/01/2020', ... }
 * ]
 * will be return the result
 * {
 *  01/01/2020' : [{appName: 'app1'}]
 *  02/01/2020' : [{appName: 'app2'}, {appName: 'app3'}]
 *  03/01/2020' : []
 *  04/01/2020' : [{appName: 'app4'}]
 * }
 *
 * @param apps installed apps
 */
export const groupInstalledAppsByDate = (apps: InstallationModelWithAppName[]): GrouppedAppsByDate => {
  const grouppedApps: GrouppedAppsByDate = {}
  const formatedApps: InstallationModelWithDateObject[] = apps.map(app => ({
    ...app,
    createdDate: dayjs(app.created)
      .startOf('day')
      .toDate(),
  }))

  const orderedApps: InstallationModelWithDateObject[] = orderBy(formatedApps, ['createdDate'], ['asc'])
  const tmpgrouppedApps = {}
  let tmpApp: InstallationModelWithDateObject, tmpLabel
  if (orderedApps.length === 0) {
    return grouppedApps
  }
  for (let i = 0; i < orderedApps.length; i++) {
    tmpApp = orderedApps[i]
    tmpLabel = dayjs(tmpApp.createdDate).format('DD/MM/YYYY')
    if (!tmpgrouppedApps[tmpLabel]) {
      tmpgrouppedApps[tmpLabel] = [tmpApp]
    } else {
      tmpgrouppedApps[tmpLabel].push(tmpApp)
    }
  }
  let tmpDate = orderedApps[0].createdDate
  while (tmpDate <= orderedApps[orderedApps.length - 1].createdDate) {
    tmpLabel = dayjs(tmpDate).format('DD/MM/YYYY')
    if (!tmpgrouppedApps[tmpLabel]) {
      grouppedApps[tmpLabel] = []
    } else {
      grouppedApps[tmpLabel] = tmpgrouppedApps[tmpLabel]
    }
    tmpDate = dayjs(tmpDate)
      .add(1, 'day')
      .toDate()
  }

  return grouppedApps
}

/**
 * Get array number of installed apps each date from groupInstalledAppsByDate
 *
 * @param grouppedApp groupped installed apps
 */
export const getChartData = (grouppedApp: GrouppedAppsByDate): Array<number> =>
  Object.values(grouppedApp).map(item => item.length)

export type GrouppedAppsByNameAndCount = {
  [key: string]: { name: string; count: number }
}

/**
 * Group installed app in a date by name and count
 *
 * @param apps installed apps
 */
export const groupAppsByNameAndCount = (apps: InstallationModelWithDateObject[]): GrouppedAppsByNameAndCount => {
  const result: GrouppedAppsByNameAndCount = {}
  apps.forEach((app: InstallationModelWithDateObject) => {
    if (!result[app.appId!]) {
      result[app.appId!] = { name: app.appName || '', count: 1 }
    } else {
      result[app.appId!].count++
    }
  })

  return result
}

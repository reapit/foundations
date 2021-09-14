import express from 'express'
import { AppResolver } from '../resolvers/app-resolver'
import { ejectApp } from './'

export const ejectAppRoute = async (req: express.Request, res: express.Response) => {
  const { appId } = req.params
  const resolver = new AppResolver()

  const app = await resolver.getApp(appId)
  if (!app) {
    return res.status(404).json('not found')
  }

  const ejectedApp = await ejectApp(app)
  const fileName = `${app.name}-ejected.zip`
  const fileType = 'application/zip'

  res.writeHead(200, {
    'Content-Disposition': `attachment; filename="${fileName}"`,
    'Content-Type': fileType,
  })
  res.end(ejectedApp)
}

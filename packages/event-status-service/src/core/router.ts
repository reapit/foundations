import { Router } from 'express'
// import { AppRequest, AppResponse } from './logger'

const router = Router()

router.get('/', (req: any, res: any) => {
  return res.send('event-status-service OK')
})
router.get('/test', (req: any, res: any) => {
  res.send('event-status-service test endpoint OK')
})
router.post('/test', (req: any, res: any) => {
  res.send('event-status-service test POST endpoint OK')
})

export default router

import Express from 'express'
import getProperties from '../api/get-properties'
import getPropertyImages from '../api/get-property-images'

const router = Express.Router()

router.get('/properties', (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>
  getProperties(req, res, next),
)
router.get('/propertyimages', (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>
  getPropertyImages(req, res, next),
)

export default router

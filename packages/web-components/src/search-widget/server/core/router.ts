import Express from 'express'
import getProperties from '../api/get-properties'
import getPropertyImages from '../api/get-property-images'

const router = Express.Router()

router.get('/properties', (req: Express.Request, res: Express.Response) => getProperties(req, res))
router.get('/propertyimages', (req: Express.Request, res: Express.Response) => getPropertyImages(req, res))

export default router

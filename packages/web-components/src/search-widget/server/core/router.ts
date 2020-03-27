import { Router, Response, Request } from 'express'
import getProperties from '../api/get-properties'
import getPropertyImages from '../api/get-property-images'

const router = Router()

router.get('/properties', (req: Request, res: Response) => getProperties(req, res))
router.get('/propertyImages', (req: Request, res: Response) => getPropertyImages(req, res))

export default router

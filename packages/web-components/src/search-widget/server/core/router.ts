import { Router, Response, Request, NextFunction } from 'express'
import getProperties from '../api/get-properties'
import getPropertyImages from '../api/get-property-images'

const router = Router()

router.get('/properties', (req: Request, res: Response, next: NextFunction) => getProperties(req, res, next))
router.get('/propertyimages', (req: Request, res: Response, next: NextFunction) => getPropertyImages(req, res, next))

export default router

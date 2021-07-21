import { Router } from 'express'
import {
  deployRelease,
  deployVersion,
  pipelineCreate,
  pipelineDelete,
  pipelineGet,
  pipelinePaginate,
  pipelineRunnerCreate,
  pipelineRunnerGet,
  pipelineRunnerPaginate,
  pipelineRunnerUpdate,
  pipelineUpdate,
  projectPaginate,
  releasePaginate,
} from './../functions'

const router = Router()

router.get('/pipeline', pipelinePaginate)
router.get('/pipeline/:pipelineId', pipelineGet)
router.put('/pipeline/:pipelineId', pipelineUpdate)
router.post('/pipeline', pipelineCreate)
router.delete('/pipeline/:pipelineId', pipelineDelete)
router.get('/pipeline/:pipelineId/pipelinerunner', pipelineRunnerPaginate)
router.get('/pipeline/:pipelineId/pipelinerunner/:pipelineRunnerId', pipelineRunnerGet)
router.post('/pipeline/:pipelineId/pipelinerunner', pipelineRunnerCreate)
router.put('/pipeline/:pipelineId/pipelinerunner/:pipelineRunnerId', pipelineRunnerUpdate)

router.post('/deploy/release/:projectName/:version', deployRelease)
router.post('/deploy/version/:projectName/:version', deployVersion)
router.get('/deploy/release/:projectName/', projectPaginate)
router.get('/deploy/release', releasePaginate)

export default router

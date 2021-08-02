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

router.get('/dev/pipeline', pipelinePaginate)
router.get('/dev/pipeline/:pipelineId', pipelineGet)
router.put('/dev/pipeline/:pipelineId', pipelineUpdate)
router.post('/dev/pipeline', pipelineCreate)
router.delete('/dev/pipeline/:pipelineId', pipelineDelete)
router.get('/dev/pipeline/:pipelineId/pipelinerunner', pipelineRunnerPaginate)
router.get('/dev/pipeline/:pipelineId/pipelinerunner/:pipelineRunnerId', pipelineRunnerGet)
router.post('/dev/pipeline/:pipelineId/pipelinerunner', pipelineRunnerCreate)
router.put('/dev/pipeline/:pipelineId/pipelinerunner/:pipelineRunnerId', pipelineRunnerUpdate)

router.post('/dev/deploy/release/:projectName/:version', deployRelease)
router.post('/dev/deploy/version/:projectName/:version', deployVersion)
router.get('/dev/deploy/release/:projectName/', projectPaginate)
router.get('/dev/deploy/release', releasePaginate)

router.get('/*', (request, response) => {
  console.log(request)

  response.status(200)
  response.send('goodbye')
})

export default router

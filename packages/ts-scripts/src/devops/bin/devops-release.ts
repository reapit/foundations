import { devopsRelease } from '..'
import { getProjectConfig } from '../project-config'

const go = async () => {
  const config = await getProjectConfig()
  const stage = process.env.STAGE
  if (!stage) {
    throw new Error('STAGE env var not defined')
  }
  await devopsRelease({
    config,
    stage,
  })
}

go().catch((e) => {
  console.error(e)
  process.exit(1)
})

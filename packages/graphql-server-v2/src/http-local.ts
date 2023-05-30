import { createPlatformAxiosInstance } from './axios'
import { bootstrap } from './server'

bootstrap(createPlatformAxiosInstance())
  .then((app) => app.listen(4000, () => console.log(`running on port ${4000}`)))
  .catch(error => console.error(error))

import { bootstrapApplication } from './http'

const bootstrap = async () => {
  const [app] = await bootstrapApplication(true)

  await app.init()

  app.listen(3000)
}

bootstrap().catch((error) => console.error(error))

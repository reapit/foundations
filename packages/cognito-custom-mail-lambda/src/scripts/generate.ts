import mjml from 'mjml'
import { resolve } from 'path'
import { writeFileSync, readFileSync } from 'fs'

const templates = ['admin-user-invite', 'confirm-registration', 'forgot-password']

const routeFolder = [__dirname, '..', 'mailer', 'templates']

templates.forEach((template) => {
  const file = readFileSync(resolve(...routeFolder, `${template}.mjml`))

  const mjmlResult = mjml(file.toString())

  writeFileSync(resolve(...routeFolder, `${template}.html`), mjmlResult.html)
})

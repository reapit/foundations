import {bootstrap} from './server'

bootstrap().then((app) => app.listen(4000, () => console.log(`running on port ${4000}`)))

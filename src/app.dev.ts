import 'isomorphic-fetch'
import * as dotenv from 'dotenv'
import server from './core/server'
;(global as any).navigator = {}

dotenv.config()

const port = 3000

server.listen(port, () => console.log(`Dev app listening on port ${port}!`))

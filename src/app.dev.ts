import 'isomorphic-fetch'
import * as dotenv from 'dotenv'
import path from 'path'
import server from './core/server'
;(global as any).navigator = {}

dotenv.config()

const port = 3000

server.engine('ejs', require('ejs').renderFile)
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, '/templates/ejs'))
server.get('/emails', (_req, res) => res.render('./index'))

server.listen(port, () => console.log(`Dev app listening on port ${port}!`))

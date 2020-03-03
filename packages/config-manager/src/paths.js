const path = require('path')

const TEMP_FOLDER = path.resolve(__dirname, './.temp')
const REAPIT_TS_DEF_NAME = 'reapit-config-types.ts'

module.exports = {
  REAPIT_TS_DEF_NAME,
  REAPIT_CONFIG_IN_CWD_PATH: path.resolve(process.cwd(), './reapit-config.json'),
  REAPIT_TS_DEF_IN_CWD_PATH: path.resolve(process.cwd(), REAPIT_TS_DEF_NAME),
  REAPIT_BASE_CONFIG_PATH: path.resolve(__dirname, '../reapit-config.example.json'),
  TEMP_FOLDER,
  TEMP_LOCAL_CONFIG_FILE: path.resolve(TEMP_FOLDER, './local-config.json'),
  TEMP_REMOTE_CONFIG_FILE: path.resolve(TEMP_FOLDER, './remote-config.json'),
}

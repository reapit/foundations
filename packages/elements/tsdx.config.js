module.exports = {
  rollup(config) {
    const newConfig = {
      ...config,
      output: {
        ...config.output,
        globals: {
          ...config.output.globals,
          'styled-components': 'styled-components',
          'react-dom': 'react-dom',
          formik: 'formik',
          'react-router-dom': 'react-router-dom',
          'react-google-map': 'react-google-map',
          'react-google-maps-loader': 'react-google-maps-loader',
          'react-datepicker': 'react-datepicker',
          dayjs: 'dayjs',
          'dayjs/plugin/customParseFormat': 'dayjs/plugin/customParseFormat',
          'react-table': 'react-table',
          'react-icons/md': 'react-icons/md',
          pell: 'pell',
          himalaya: 'himalaya',
          'react-datasheet': 'react-datasheet',
          papaparse: 'papaparse',
          'dayjs/plugin/utc': 'dayjs/plugin/utc',
        },
      },
    }
    return newConfig
  },
}

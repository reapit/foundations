const scss = require('rollup-plugin-scss')

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
          'react-is': 'react-is',
          linaria: 'linaria',
          classnames: 'classnames',
          'react-icons/fa': 'react-icons/fa',
          'rc-notification': 'rc-notification',
          'rc-notification/lib/useNotification': 'rc-notification/lib/useNotification',
          'rc-select': 'rc-select',
          'rc-tooltip': 'rc-tooltip',
        },
      },
      plugins: [
        ...config.plugins,
        // I should be able to add lineria here as TSDX is Rollup under the hood but doesn't include
        // in the bundle. Have added sass with no emit so I can import the sass file into my index.tsx
        // linaria({
        //   sourceMap: process.env.NODE_ENV !== 'production',
        //   evaluate: true,
        // }),
        scss({
          output: () => {
            console.info('Not emitting CSS here, as there is a separate rollup process')
          },
        }),
      ],
    }
    return newConfig
  },
}

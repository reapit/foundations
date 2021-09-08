export const generatePackageJson = (name: string) =>
  JSON.stringify(
    {
      name,
      version: '0.1.0',
      private: true,
      dependencies: {
        react: '^17.0.2',
        'react-dom': '^17.0.2',
        'react-scripts': '4.0.3',
        '@apollo/client': '^3.4.7',
        'styled-components': '^5.3.1',
        graphql: '^15.5.1',
        'react-router': '^5.2.0',
        'react-router-dom': '^5.2.0',
        typescript: '^4.4.2',

        'omit-deep': '^0.3.0',
        'query-string': '^7.0.1',
        'clone-deep': '^4.0.1',

        '@reapit/connect-session': '^3.0.0', // TODO: should update dynamically to latest version
        '@reapit/elements': '^3.5.0', // TODO: should update dynamically to latest version
      },
      devDependencies: {
        '@types/react': '^16.9.5',
        '@types/react-dom': '^16.9.5',
        '@types/react-router-dom': '^5.1.6',
      },
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test',
        eject: 'react-scripts eject',
      },
      browserslist: {
        production: ['>0.2%', 'not dead', 'not op_mini all'],
        development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
      },
    },
    null,
    2,
  )

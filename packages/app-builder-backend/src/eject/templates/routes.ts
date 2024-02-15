import { Pages } from '../types'
import { slugToCamel, lint } from './format'
import { js } from './js'

export const generateRoutes = (pages: Pages) =>
  lint(js`
    import { BrowserRouter as Router, Route } from 'react-router-dom'
    import { PrivateRouteWrapper } from './private-router-wrapper'
    ${pages
      .map(
        (page) => js`
      import ${slugToCamel(page.id === '~' ? 'index' : page.id)} from '${page.fileLoc
        .replace('src', '.')
        .replace('.tsx', '')}'
    `,
      )
      .join('\n')}

    const Routes = () => (
      <Router>
          <PrivateRouteWrapper>
            ${pages
              .map(
                (page) => js`
                <Route
                  ${page.id === '~' ? 'exact' : ''}
                  path="/${page.id === '~' ? '' : page.id}"
                  component={${slugToCamel(page.id === '~' ? 'index' : page.id)}}
                />
              `,
              )
              .join('\n')}
          </PrivateRouteWrapper>
      </Router>
    )
    
    export default Routes
  `)

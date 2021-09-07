import { js } from './js'
import { slugToCamel, lint } from './format'

export const generatePage = (id: string, jsx: string, components: Array<string>) => {
  const name = slugToCamel(id === '~' ? 'index' : id)

  return lint(js`
    import React from 'react'

    import { ${components.join(', ')} } from '../components'

    const ${name} = () => (
      ${jsx}
    )

    export default ${name}
  `)
}

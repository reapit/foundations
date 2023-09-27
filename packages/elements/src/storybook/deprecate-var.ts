import { useEffect } from 'react'

export const useDeprecateVar = (variables: Object, component: string) => {
  useEffect(() => {
    Object.keys(variables).forEach((key) => {
      if (variables[key] !== undefined) {
        console.warn(`Prop ${key} longer supported for ${component} component and will be removed at v5 release.`)
      }
    })
  }, [])
}

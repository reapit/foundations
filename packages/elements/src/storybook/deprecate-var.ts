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

export const useDeprecateComponent = (component: string) => {
  useEffect(() => {
    console.warn(`Component ${component} no longer supported and will be removed at v5 release.`)
  }, [])
}

export const deprecateFunction = (functionName: string) => {
  console.warn(`Function ${functionName} no longer supported and will be removed at v5 release.`)
}

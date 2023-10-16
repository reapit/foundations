import { useEffect } from 'react'

export const deprecateVar = (variables: Object, component: string) => {
  Object.keys(variables).forEach((key) => {
    if (variables[key] !== undefined) {
      console.warn(`Prop ${key} longer supported for ${component} component and will be removed at v5 release.`)
    }
  })
}

export const useDeprecateVar = (variables: Object, component: string) => {
  useEffect(() => {
    deprecateVar(variables, component)
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

import { useEffect } from 'react'
import { IconNames } from '../components/icon'
import { iconSetLegacy } from '../icons'

export const deprecateVar = (variables: Object, component: string) => {
  Object.keys(variables).forEach((key) => {
    if (variables[key] !== undefined) {
      console.info(`Prop ${key} longer supported for ${component} component and will be removed at v5 release.`)
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
    console.info(`Component ${component} no longer supported and will be removed at v5 release.`)
  }, [])
}

export const useDeprecateIcon = (icon: IconNames) => {
  useEffect(() => {
    if (iconSetLegacy[icon]) {
      console.info(`Icon ${icon} no longer supported and will be removed at v5 release.`)
    }
  }, [])
}

export const deprecateFunction = (functionName: string) => {
  console.info(`Function ${functionName} no longer supported and will be removed at v5 release.`)
}

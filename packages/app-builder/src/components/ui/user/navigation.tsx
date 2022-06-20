import { NavConfig } from '@/components/hooks/apps/fragments'
import { useApp } from '@/components/hooks/apps/use-app'
import { useUpdateAppNavConfig } from '@/components/hooks/apps/use-update-app'
import { usePageId } from '@/components/hooks/use-page-id'
import Plus from '@/components/icons/plus'
import { useNode } from '@craftjs/core'
import { Label } from '@reapit/elements'
import React, { useState } from 'react'
import { AppBuilderIconButton } from '../components'
import { ToolbarDropdown, ToolbarItemType, ToolbarTextInput } from '../toolbar'
import { Navigation as ENavigation, NavigationProps } from './ejectable/navigation'

const NavItemConfigurator = ({
  navConfig,
  onChange,
}: {
  navConfig: NavConfig
  onChange: (navConfig: NavConfig) => void
}) => {
  const { appId } = usePageId()
  const { app } = useApp(appId)
  const pageNavConfigs = app?.pages.map(({ id, name }) => ({
    name,
    destination: id,
  }))

  return (
    <>
      <ToolbarDropdown
        value={navConfig.destination}
        title="Link To"
        onChange={(dest: string) => {
          const newNavConfig = pageNavConfigs?.find((page) => page.destination === dest)
          newNavConfig &&
            onChange({
              ...newNavConfig,
              icon: '',
            })
        }}
      >
        {pageNavConfigs?.map(({ name, destination }) => (
          <option key={destination} value={destination}>
            {name}
          </option>
        ))}
      </ToolbarDropdown>
      <ToolbarTextInput
        label={'Name'}
        type={ToolbarItemType.Text}
        onChange={(newName) => {
          onChange({
            ...navConfig,
            name: newName,
          })
        }}
        value={navConfig.name}
      />
      <div>
        <Label>Icon</Label>
      </div>
    </>
  )
}

const NavigationSettings = () => {
  const { appId } = usePageId()
  const { app } = useApp(appId)
  const { updateAppNavConfig } = useUpdateAppNavConfig(appId)
  const navConfigs = app?.navConfig || []
  const [currentNavConfig, setCurrentNavConfig] = useState<NavConfig | undefined>(undefined)

  return (
    <div>
      <ToolbarDropdown
        value={currentNavConfig}
        title="Section"
        onChange={(dest: string) => {
          const navConfig = navConfigs.find(({ destination }) => destination === dest)
          console.log(navConfigs, dest, navConfig)
          navConfig && setCurrentNavConfig(navConfig)
        }}
      >
        <option value="" disabled>
          Select
        </option>
        {navConfigs.map(({ name, destination }) => (
          <option key={destination} value={destination}>
            {name}
          </option>
        ))}
      </ToolbarDropdown>
      <AppBuilderIconButton
        onClick={() => {
          const newNavConfig = {
            name: 'Home',
            destination: '~',
            icon: '',
          }
          updateAppNavConfig([...navConfigs, newNavConfig])
          setCurrentNavConfig(newNavConfig)
        }}
      >
        <Plus />
      </AppBuilderIconButton>
      {currentNavConfig && (
        <NavItemConfigurator
          navConfig={currentNavConfig}
          onChange={(navConfig) => {
            setCurrentNavConfig(navConfig)
            updateAppNavConfig(
              navConfigs.map((n) => {
                if (n.destination === navConfig.destination) {
                  return navConfig
                }
                return n
              }),
            )
          }}
        />
      )}
    </div>
  )
}

const Navigation = (props: NavigationProps) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return <ENavigation {...props} ref={(ref) => ref && connect(drag(ref))} />
}

Navigation.craft = {
  displayName: 'Navigation',
  props: {},
  related: {
    toolbar: NavigationSettings,
  },
}

export default Navigation

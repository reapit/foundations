import { NavConfig } from '@/components/hooks/apps/fragments'
import { useAppPages } from '@/components/hooks/apps/use-app'
import { useUpdateAppNavConfig } from '@/components/hooks/apps/use-update-app'
import { usePageId } from '@/components/hooks/use-page-id'
import Plus from '@/components/icons/plus'
import { useNode } from '@craftjs/core'
import { styled } from '@linaria/react'
import { Label, iconSet, IconNames } from '@reapit/elements'
import React, { useState } from 'react'
import * as uuid from 'uuid'
import { AppBuilderIconButton } from '../components'
import { ToolbarDropdown, ToolbarItemType, ToolbarTextInput } from '../toolbar'
import { camelCaseToSentence } from './ejectable'
import { Navigation as ENavigation, NavigationProps } from './ejectable/navigation'

const ToolbarDropdownContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 12px;

  & > label.el-label {
    min-width: 50px;
  }
`

const icons = Object.keys(iconSet).filter((key) => key.endsWith('Menu'))

const IconPickerContainer = styled.div`
  display: flex;
  flex: 1;

  .el-select {
    margin-right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const IconContainer = styled.div`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 0;

  /* Secondary/Dark Blue - variant */

  background: #31448f;
  border-radius: 4px 0px 0px 4px;
`

const IconPicker = ({ value, onChange }: { value: IconNames; onChange: (newIcon: IconNames) => void }) => {
  const Icon = iconSet[value]
  return (
    <IconPickerContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <ToolbarDropdown value={value} onChange={onChange}>
        <option value="">None</option>
        {icons.map((name) => (
          <option key={name} value={name}>
            {camelCaseToSentence(name.replace('Menu', ''))}
          </option>
        ))}
      </ToolbarDropdown>
    </IconPickerContainer>
  )
}

const NavItemConfigurator = ({
  navConfig,
  onChange,
}: {
  navConfig: NavConfig
  onChange: (navConfig: NavConfig) => void
}) => {
  const { appId } = usePageId()
  const { pages } = useAppPages(appId)
  const pageNavConfigs = pages?.map(({ id, name }) => ({
    name,
    destination: id,
  }))

  return (
    <>
      <ToolbarDropdownContainer>
        <Label>Link To</Label>
        <ToolbarDropdown
          value={navConfig.destination}
          onChange={(dest: string) => {
            const newNavConfig = pageNavConfigs?.find((page) => page.destination === dest)
            newNavConfig &&
              onChange({
                ...navConfig,
                ...newNavConfig,
              })
          }}
        >
          {pageNavConfigs?.map(({ name, destination }) => (
            <option key={destination} value={destination}>
              {name}
            </option>
          ))}
        </ToolbarDropdown>
      </ToolbarDropdownContainer>
      <ToolbarDropdownContainer>
        <Label>Name</Label>
        <ToolbarTextInput
          type={ToolbarItemType.Text}
          onChange={(newName) => {
            onChange({
              ...navConfig,
              name: newName,
            })
          }}
          value={navConfig.name}
        />
      </ToolbarDropdownContainer>
      <ToolbarDropdownContainer>
        <Label>Icon</Label>
        <IconPicker
          value={navConfig.icon}
          onChange={(newIcon) => {
            onChange({
              ...navConfig,
              icon: newIcon,
            })
          }}
        />
      </ToolbarDropdownContainer>
    </>
  )
}

const NavigationSettings = () => {
  const { appId } = usePageId()
  const { navConfigs, updateAppNavConfig } = useUpdateAppNavConfig(appId)
  const [currentNavConfigId, setCurrentNavConfigId] = useState<string | undefined>(undefined)
  const currentNavConfig = navConfigs?.find((navConfig) => navConfig.id === currentNavConfigId)

  return (
    <div>
      <ToolbarDropdownContainer>
        <Label>Section</Label>
        <ToolbarDropdown value={currentNavConfigId || ''} onChange={setCurrentNavConfigId}>
          <option value="" disabled>
            Select
          </option>
          {navConfigs?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </ToolbarDropdown>
        <AppBuilderIconButton
          onClick={() => {
            const newNavConfig = {
              name: 'Home',
              destination: '~',
              icon: 'defaultMenu' as IconNames,
              id: uuid.v4(),
            }
            updateAppNavConfig([...navConfigs, newNavConfig])
            setCurrentNavConfigId(newNavConfig.id)
          }}
        >
          <Plus />
        </AppBuilderIconButton>
      </ToolbarDropdownContainer>
      {currentNavConfig && (
        <NavItemConfigurator
          navConfig={currentNavConfig}
          onChange={(navConfig) => {
            updateAppNavConfig(
              navConfigs.map((n) => {
                if (n.id === navConfig.id) {
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

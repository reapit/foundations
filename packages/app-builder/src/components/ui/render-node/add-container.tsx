import { NAV_NODE } from '@/components/hooks/apps/node-helpers'
import { useNavConfig } from '@/components/hooks/use-nav-config'
import { isEditor } from '@/core/config'
import { ROOT_NODE } from '@craftjs/core'
import { styled } from '@linaria/react'
import { Button } from '@reapit/elements'
import React, { useState } from 'react'
import { HeaderContainer, FooterContainer, BodyContainer, RootContainer, NavigationContainer } from './styles'

const NavToggleButton = styled(Button)`
  background: #eaf5fc;
  border-radius: 4px;
  color: black;
  text-transform: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  padding-left: 8px;
  padding-right: 8px;

  position: absolute;
  margin-left: 12px;
  height: 32px;
  margin-top: 6px;
  z-index: 9999;

  svg {
    margin-right: 4px;
    margin-left: 0;
  }
`

const EyeOpen = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1224_5013)">
      <path
        d="M10 6.78125C8.22421 6.78125 6.78137 8.22409 6.78137 9.9999C6.78137 11.7757 8.22421 13.2185 10 13.2185C11.7758 13.2185 13.2187 11.7757 13.2187 9.9999C13.2187 8.22409 11.7758 6.78125 10 6.78125ZM9.75584 9.0454C9.35629 9.0454 9.02332 9.37836 9.02332 9.77792H7.95784C7.98004 8.77903 8.77915 7.97992 9.75584 7.97992V9.0454Z"
        fill="#23A4DE"
      />
      <path
        d="M19.7669 9.33386C18.6792 7.97981 14.7947 3.5625 10 3.5625C5.20533 3.5625 1.32075 7.97981 0.233074 9.33386C-0.0776914 9.71122 -0.0776914 10.2662 0.233074 10.6657C1.32075 12.0198 5.20533 16.4371 10 16.4371C14.7947 16.4371 18.6792 12.0198 19.7669 10.6657C20.0777 10.2884 20.0777 9.73342 19.7669 9.33386ZM10 14.6613C7.42508 14.6613 5.33851 12.5747 5.33851 9.99979C5.33851 7.42487 7.42508 5.3383 10 5.3383C12.5749 5.3383 14.6615 7.42487 14.6615 9.99979C14.6615 12.5747 12.5749 14.6613 10 14.6613Z"
        fill="#23A4DE"
      />
    </g>
    <defs>
      <clipPath id="clip0_1224_5013">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const EyeClosed = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="#EAF5FC" />
    <path
      d="M18.8516 7.03127C18.7563 7.13688 18.6549 7.25088 18.5474 7.37192C18.2127 7.74858 17.8118 8.1989 17.3431 8.66994L18.281 9.58766C18.3967 9.69747 18.465 9.85073 18.4704 10.0131C18.4761 10.1754 18.4185 10.3333 18.3106 10.4513C18.2027 10.5694 18.0536 10.6376 17.8967 10.641C17.7397 10.6443 17.588 10.5823 17.4755 10.469L16.4714 9.48693C15.8252 10.056 15.1233 10.5535 14.377 10.9711L14.9499 12.1913C15.0415 12.3863 15.0254 12.6171 14.9081 12.7966C14.7906 12.9762 14.5895 13.0772 14.3805 13.0616C14.1714 13.0462 13.9864 12.9165 13.8948 12.7214L13.3112 11.4797C12.4428 11.8313 11.5268 12.0417 10.596 12.103V13.3934C10.596 13.6102 10.4843 13.8104 10.3029 13.9188C10.1216 14.0271 9.8981 14.0271 9.71675 13.9188C9.53541 13.8104 9.42366 13.6102 9.42366 13.3934V12.103C8.49256 12.0417 7.57613 11.8315 6.7073 11.4798L6.1244 12.7215C6.03294 12.9166 5.84766 13.0462 5.6387 13.0616C5.42974 13.0772 5.22864 12.9762 5.11114 12.7966C4.99364 12.6171 4.97767 12.3863 5.06914 12.1913L5.64276 10.9711C4.89629 10.5536 4.19418 10.056 3.54806 9.48693L2.54384 10.469C2.39114 10.614 2.17565 10.6647 1.97728 10.6023C1.77892 10.54 1.62715 10.3739 1.57807 10.1655C1.52901 9.95701 1.58998 9.73728 1.73849 9.58765L2.67666 8.67076C2.20771 8.19944 1.80679 7.74912 1.47209 7.37205C1.36467 7.25073 1.26326 7.13727 1.16814 7.0318C1.05731 6.91522 0.996733 6.75735 1.00014 6.59393C1.00341 6.43051 1.07027 6.27534 1.18568 6.16365C1.30108 6.05194 1.45509 5.99318 1.61289 6.00063C1.77069 6.00808 1.91894 6.08119 2.02399 6.20318C2.12134 6.31055 2.2251 6.42726 2.33501 6.55073C3.78427 8.18129 6.21021 10.9111 10.0097 10.9111C13.8092 10.9111 16.2347 8.18153 17.6844 6.55073C17.7946 6.42671 17.8981 6.30986 17.9957 6.20249C18.1401 6.05044 18.351 5.98802 18.5513 6.03812C18.7515 6.08808 18.9116 6.24311 18.9732 6.4466C19.0347 6.64996 18.9886 6.87207 18.8516 7.03127Z"
      fill="#23A4DE"
      stroke="#23A4DE"
    />
  </svg>
)

const ConnectedRootContainer = ({ children }) => {
  const isViewer = !isEditor()
  const { subItems } = useNavConfig()
  const [showNav, setShowNav] = useState(false)
  const expandNav = subItems && subItems.length > 1

  return (
    <RootContainer expandNav={!!expandNav} showNav={isViewer || showNav}>
      {!isViewer && (
        <NavToggleButton onClick={() => setShowNav(!showNav)}>
          {showNav ? <EyeClosed /> : <EyeOpen />}
          {showNav ? 'Hide' : 'Show'} Navigation
        </NavToggleButton>
      )}
      {children}
    </RootContainer>
  )
}

export const AddContainer = ({ nodeId, children }: { nodeId: string; children: React.ReactChild }) => {
  const isHeader = nodeId === 'header'
  const isFooter = nodeId === 'footer'
  const isBody = nodeId === 'body'
  const isNavigation = nodeId === NAV_NODE
  const isRoot = nodeId === ROOT_NODE
  const isViewer = !isEditor()

  return (
    <>
      {isHeader && <HeaderContainer>{children}</HeaderContainer>}
      {isFooter && <FooterContainer>{children}</FooterContainer>}
      {isBody && <BodyContainer>{children}</BodyContainer>}
      {isRoot && <ConnectedRootContainer>{children}</ConnectedRootContainer>}
      {isNavigation && (
        <NavigationContainer
          style={{
            paddingTop: isViewer ? 0 : undefined,
          }}
        >
          {children}
        </NavigationContainer>
      )}
      {!isHeader && !isFooter && !isBody && !isRoot && !isNavigation && children}
    </>
  )
}

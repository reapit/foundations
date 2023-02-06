import { styled } from '@linaria/react'
import { forMobileAndAbove, forWidescreenAndAbove } from '../../../core/__styles__/media'

export const InstalledAppsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-grey-light);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${forMobileAndAbove} {
    padding: 2.5rem;
  }

  ${forWidescreenAndAbove} {
    padding: 2.5rem 1.5rem;
  }
`

export const InstalledAppsInnerContainer = styled.div`
  width: 100%;

  ${forWidescreenAndAbove} {
    padding: 3.75rem 4.75rem;
  }
`

export const InstalledAppsGrid = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));

  ${forMobileAndAbove} {
    grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    grid-row-gap: 2.5rem;
    grid-column-gap: 3rem;
  }
`

export const InstalledAppsCol = styled.div`
  cursor: pointer;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InstallMoreApps = styled(InstalledAppsCol)`
  justify-content: flex-start;
  text-align: center;
  width: 68px;
  height: 100px;
  background: var(--color-white);
  filter: drop-shadow(2px 6px 20px rgba(0, 0, 0, 0.07));
  border-radius: 0.25rem;
  font-size: 12px;
  padding: 0.375rem;

  ${forMobileAndAbove} {
    padding: 0.825rem;
    font-size: 14px;
    width: 96px;
    height: 124px;
    border-radius: 0.75rem;
  }
`

export const InstalledAppsIcon = styled.img`
  width: 40px;
  height: 40px;
  background-color: var(--color-white);

  ${forMobileAndAbove} {
    width: 80px;
    height: 80px;
  }
`

export const InstalledAppsIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  filter: drop-shadow(2px 6px 20px rgba(0, 0, 0, 0.07));
  width: 64px;
  height: 64px;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;

  ${forMobileAndAbove} {
    width: 96px;
    height: 96px;
    border-radius: 0.75rem;
  }
`

export const InstalledAppsText = styled.div`
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: center;

  ${forMobileAndAbove} {
    font-size: 14px;
  }
`

export const InstalledSuggestedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
  border: 1px solid var(--color-grey-medium);
`

export const InstalledSuggestedImageWrapper = styled.div`
  width: 100%;
  height: 245px;
  background-color: var(--color-grey-light);
  border-radius: 0.25rem;
  cursor: pointer;
`

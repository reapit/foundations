import { styled } from '@linaria/react'
import { isTablet } from '../../../styles/media'
import { ElAvatar, ElAvatarImage } from '../../avatar'
import { ElText2XL, ElTextBase } from '../../typography'
import { css } from '@linaria/core'

const dot = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
</svg>
`

export const elPageHeaderMaxWidth = css``

export const ElPageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${ElTextBase} {
    margin-bottom: 0.5rem;
  }

  ${isTablet} {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.25rem;

    ${ElTextBase} {
      margin-bottom: 0;
    }
  }
`

export const ElPageHeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 0.5rem;

  ${ElText2XL} {
    margin-bottom: 0.5rem;
  }

  ${isTablet} {
    flex-direction: row;
    align-items: center;

    ${ElText2XL} {
      margin-bottom: 0;
    }
  }
`

export const ElPageHeaderWrapInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0 0 0;

  &.${elPageHeaderMaxWidth} {
    max-width: 1200px;
    margin: 0 auto;
  }

  ${isTablet} {
    padding: 2.5rem 1.5rem 0 1.5rem;
  }
`

export const ElPageHeaderWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  width: calc(100% + 2.5rem);
  translate: -1.25rem -0.5rem;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--color-grey-100);
  margin-bottom: 0.5rem;

  ${ElAvatarImage} {
    border-radius: 0.25rem;
  }

  ${ElAvatar} {
    margin-bottom: 0.5rem;
  }

  ${isTablet} {
    padding: 0;
    margin-bottom: 0;
    width: calc(100% + 3rem);
    translate: -1.5rem -2.5rem;

    ${ElAvatar} {
      width: 48px;
      height: 48px;
      margin-right: 1rem;

      img {
        max-width: 48px;
      }
    }

    ${ElAvatarImage} {
      width: 100px;
      height: 80px;
      border-radius: 0.5rem;

      img {
        max-width: 100px;
      }
    }
  }
`

export const ElPageHeaderSeparator = styled.span`
  height: 1.5rem;
  width: 1.5rem;
  position: relative;
  color: var(--color-grey-500);

  &::before {
    content: '';
    position: absolute;
    background-image: url('${dot}');
    background-position: center center;
    background-repeat: no-repeat;
    height: 1.5rem;
    width: 1.5rem;
    right: 0rem;
  }
`

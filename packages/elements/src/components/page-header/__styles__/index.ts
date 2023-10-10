import { styled } from '@linaria/react'
import { isTablet } from '../../../styles/media'
import { ElAvatar, ElAvatarImage } from '../../avatar'
import { ElText2XL, ElTextBase } from '../../typography'

const dot = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
</svg>
`

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

export const ElPageHeaderWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${ElAvatarImage} {
    border-radius: 0.25rem;
  }

  ${ElAvatar} {
    margin-bottom: 0.5rem;
  }

  ${isTablet} {
    padding: 0 1rem;

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

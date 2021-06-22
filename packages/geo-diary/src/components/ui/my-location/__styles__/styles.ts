import { styled } from 'linaria/react'

export const MyLocationSection = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  .el-input-group {
    width: 100%;
  }
`

export const DestinationLocationSection = styled.div`
  display: flex;
  width: 100%;
  border-bottom: var(--component-input-border-bottom);
  color: var(--color-black);
  overflow: hidden;
  white-space: nowrap;
  padding: 0 0.5rem;
  height: 2.25rem;
  align-items: center;
`

export const MyLocationSectionResults = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
`

export const MyLocationSectionResult = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  color: #0061a8;

  svg {
    position: absolute;
    font-size: 1.8rem;
    color: black;
    right: 1.5rem;
    top: 0.75rem;
  }
`

export const MyLocationIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid var(--color-grey-medium);

  svg {
    font-size: 1.5rem;
    color: #0061a8;
  }
`

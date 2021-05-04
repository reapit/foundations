import { styled } from 'linaria/react'

export const MyLocationSection = styled.div`
  padding: 0 1rem;
  display: flex;
  width: 100%;
  position: relative;

  .el-input-group {
    width: 100%;
  }
`

export const MyLocationSectionResults = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 2rem);
`

export const MyLocationSectionResult = styled.div`
  position: absolute;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid black;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  color: #0061a8;
`

export const MyLocationIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid black;

  svg {
    font-size: 1.8rem;
  }
`

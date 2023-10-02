import { styled } from '@linaria/react'

export const HtmlContentWrap = styled.div`
  font-family: var(--font-sans-serif);
  font-weight: normal;
  color: var(--color-black);
  font-size: var(--font-size-small);
  line-height: 1.25rem;
  letter-spacing: -1%;
  margin-bottom: 0.25rem;
  float: none;

  * {
    float: none;
  }

  p,
  div,
  ol,
  ul {
    color: var(--color-black);
  }

  h5 {
    font-size: var(--font-size-subheading);
    color: var(--color-black);
    line-height: 1.5rem;
    letter-spacing: 0%;
    margin-bottom: 1.25rem;

    b,
    i {
      color: var(--color-black);
    }
  }

  li {
    margin-bottom: 0.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin-left: 1rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: numbered;
  }

  i {
    font-style: italic;
    color: var(--color-black);
  }

  b {
    font-weight: bold;
    color: var(--color-black);
  }

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  @media (min-width: 768px) {
    font-size: var(--font-size-default);
  }
`

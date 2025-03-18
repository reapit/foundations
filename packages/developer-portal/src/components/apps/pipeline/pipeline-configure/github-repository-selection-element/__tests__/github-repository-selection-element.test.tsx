import React from 'react'
import { GithubRepositorySelectionElement, resolveDisplayValue } from '../github-repository-selection-element'
import { render } from '../../../../../../tests/react-testing'

describe('GitHubRepositorySelectionElement', () => {
  describe('resolveDisplayValue', () => {
    it('Will return default value when repository not set', () => {
      expect(
        resolveDisplayValue({
          defaultValue: 'This is the default',
          placeholder: 'placeholder',
        }),
      ).toBe('This is the default')
    })

    it('Will return selected repository and not default', () => {
      expect(
        resolveDisplayValue({
          defaultValue: 'This is the deafult',
          repositoryUrl: 'repositoryUrl',
          placeholder: 'placeholder',
        }),
      ).toBe('repositoryUrl')
    })

    it('Will return placeholder if placeholder set, no default and no repository', () => {
      expect(
        resolveDisplayValue({
          placeholder: 'placeholder',
        }),
      )
    })

    it('Will return "Not Selected" of no values set', () => {
      expect(resolveDisplayValue({})).toBe('Not Selected')
    })
  })

  it('Should match snapshot', () => {
    expect(render(<GithubRepositorySelectionElement />)).toMatchSnapshot()
  })
})

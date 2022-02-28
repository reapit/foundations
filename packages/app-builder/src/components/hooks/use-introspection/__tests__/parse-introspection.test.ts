import { parseIntrospectionResult } from '../parse-introspection'
import introspectionQueryResultData from './introspection-query-result.json'

describe('parseIntrospectionResult', () => {
  it('should produce the expected result', () => {
    expect(parseIntrospectionResult(introspectionQueryResultData.data as any)).toMatchSnapshot()
  })
})

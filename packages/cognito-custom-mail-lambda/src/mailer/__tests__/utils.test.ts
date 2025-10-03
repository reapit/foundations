import { tryGetFirstName } from '../utils'

describe('tryGetFirstName', () => {
  it('should return the input if the input length is less than 2', () => {
    expect(tryGetFirstName('A')).toBe('A')
  })

  it('should return empty string for empty input', () => {
    expect(tryGetFirstName('')).toBe('')
  })

  it('should return empty string for undefined input', () => {
    expect(tryGetFirstName(undefined)).toBe('')
  })

  it('should return single character for single character input', () => {
    expect(tryGetFirstName('J')).toBe('J')
  })

  it('should handle single space', () => {
    expect(tryGetFirstName(' ')).toBe(' ')
  })

  it('should handle whitespace-only input', () => {
    expect(tryGetFirstName('   ')).toBe('   ')
  })

  it('should return the first part of the name if the name has less than 3 parts', () => {
    expect(tryGetFirstName('John Doe')).toBe('John')
  })

  it('should handle single name', () => {
    expect(tryGetFirstName('John')).toBe('John')
  })

  it('should return the second part of the name if the first part is a title', () => {
    expect(tryGetFirstName('Mr John Doe')).toBe('John')
  })

  it('should return the first part of the name if the first part is not a title', () => {
    expect(tryGetFirstName('John Mr Doe')).toBe('John')
  })

  it('should handle all title variations - Mr', () => {
    expect(tryGetFirstName('Mr John Smith')).toBe('John')
  })

  it('should handle all title variations - Mrs', () => {
    expect(tryGetFirstName('Mrs Jane Smith')).toBe('Jane')
  })

  it('should handle all title variations - Dr', () => {
    expect(tryGetFirstName('Dr Sarah Connor')).toBe('Sarah')
  })

  it('should handle all title variations - Doctor', () => {
    expect(tryGetFirstName('Doctor James Wilson')).toBe('James')
  })

  it('should handle all title variations - Master', () => {
    expect(tryGetFirstName('Master Bruce Wayne')).toBe('Bruce')
  })

  it('should handle all title variations - Miss', () => {
    expect(tryGetFirstName('Miss Mary Jane')).toBe('Mary')
  })

  it('should handle all title variations - Ms', () => {
    expect(tryGetFirstName('Ms Rachel Green')).toBe('Rachel')
  })

  it('should handle all title variations - Sir', () => {
    expect(tryGetFirstName('Sir Elton John')).toBe('Elton')
  })

  it('should handle all title variations - Mdm', () => {
    expect(tryGetFirstName('Mdm Alice Wong')).toBe('Alice')
  })

  it('should handle all title variations - Madam', () => {
    expect(tryGetFirstName('Madam Secretary General')).toBe('Secretary')
  })

  it('should handle all title variations - Dame', () => {
    expect(tryGetFirstName('Dame Judi Dench')).toBe('Judi')
  })

  it('should handle all title variations - Lord', () => {
    expect(tryGetFirstName('Lord Voldemort Riddle')).toBe('Voldemort')
  })

  it('should handle all title variations - Lady', () => {
    expect(tryGetFirstName('Lady Diana Spencer')).toBe('Diana')
  })

  it('should handle all title variations - Esq', () => {
    expect(tryGetFirstName('Esq Robert Jones')).toBe('Robert')
  })

  it('should handle all title variations - Prof', () => {
    expect(tryGetFirstName('Prof Albert Einstein')).toBe('Albert')
  })

  it('should handle all title variations - Professor', () => {
    expect(tryGetFirstName('Professor Stephen Hawking')).toBe('Stephen')
  })

  it('should handle name with multiple spaces', () => {
    expect(tryGetFirstName('John   Doe')).toBe('John')
  })

  it('should handle name with leading spaces', () => {
    expect(tryGetFirstName('  John Doe')).toBe('John')
  })

  it('should handle name with trailing spaces', () => {
    expect(tryGetFirstName('John Doe  ')).toBe('John')
  })

  it('should handle title with 4 name parts', () => {
    expect(tryGetFirstName('Mr John Michael Smith')).toBe('John')
  })

  it('should handle title with many name parts', () => {
    expect(tryGetFirstName('Dr Albert John Michael Smith')).toBe('Albert')
  })

  it('should be case-sensitive for titles', () => {
    expect(tryGetFirstName('mr John Doe')).toBe('mr')
  })

  it('should handle two-letter name after title', () => {
    expect(tryGetFirstName('Mr Al Capone')).toBe('Al')
  })

  it('should handle hyphenated names', () => {
    expect(tryGetFirstName('Jean-Paul Sartre')).toBe('Jean-Paul')
  })

  it('should handle names with apostrophes', () => {
    expect(tryGetFirstName("O'Brien Patrick")).toBe("O'Brien")
  })
})

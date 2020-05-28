import { writable } from 'svelte/store'
import { BookValuationWidgetThemeClasses } from '../theme'

export const themeStore = writable<BookValuationWidgetThemeClasses | null>({
  timeCell: '',
  svgNavigation: '',
  timeCellsContainer: '',
  dateCellHeader: '',
  formBlock: '',
  formInput: '',
  formHeader: '',
  formLabel: '',
  formSeparator: '',
  formButtonPrimary: '',
  formButtonSecondary: '',
})

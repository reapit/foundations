import '../src/styles/index.scss'
import { configure } from '@storybook/react'

const req = require.context('../src', true, /\.stories\.tsx$/)
const loadStories = () => {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

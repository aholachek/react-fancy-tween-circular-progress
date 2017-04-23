import { configure, setAddon } from '@kadira/storybook'
import InfoAddon from '@kadira/react-storybook-addon-info'

setAddon(InfoAddon)

function loadStories () {
  require('../stories')
}

configure(loadStories, module)

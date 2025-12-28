import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8hngvmaz',
    dataset: 'production'
  },
  /**
   * Disable auto-updates
   */
  autoUpdates: false,
})

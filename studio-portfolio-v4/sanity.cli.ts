import {defineCliConfig} from 'sanity/cli'
import {sanityAppId, sanityDataset, sanityProjectId} from './environment'

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: sanityAppId,
    autoUpdates: true,
  },
})

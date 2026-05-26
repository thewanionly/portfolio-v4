import {defineCliConfig} from 'sanity/cli'
import {sanityAppId, sanityDataset, sanityProjectId} from './environment'

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
  ...(sanityAppId
    ? {
        deployment: {
          /**
           * Optional Sanity-hosted Studio deployment config.
           * Vercel deployments only need the build output from `sanity build`.
           */
          appId: sanityAppId,
          autoUpdates: true,
        },
      }
    : {}),
})

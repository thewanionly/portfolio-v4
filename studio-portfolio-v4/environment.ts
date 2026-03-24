function missingEnv(name: string): never {
  throw new Error(
    `Missing ${name}. Add it to studio-portfolio-v4/.env.local or another Sanity env file.`,
  )
}

export const sanityProjectId =
  process.env.SANITY_STUDIO_PROJECT_ID || missingEnv('SANITY_STUDIO_PROJECT_ID')

export const sanityDataset =
  process.env.SANITY_STUDIO_DATASET || missingEnv('SANITY_STUDIO_DATASET')

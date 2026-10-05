export type WorkProject = {
  _id: string
  title: string
  slug?: {current?: string} | null
  year: number
  client?: string | null
  disciplines?: string[] | null
  sector?: string | null
  orderRank?: number | null
  summary?: string | null
  coverImage?: unknown
  heroImage?:unknown
  mobileHeroImage?:unknown
}

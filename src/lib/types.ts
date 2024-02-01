export type PaginatedProductsParams = {
  limit: number
  q?: string
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

export type FilterOptions = {
  size?: Array<string>
  color?: Array<string>
}

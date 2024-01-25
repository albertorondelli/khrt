
import { useEffect } from "react"
import {
  SortBy,
  useCurrentRefinements,
  useInfiniteHits,
  useInstantSearch,
} from "react-instantsearch"
import ProductPreview from "@modules/products/components/product-preview"
import { Adjustments } from "@medusajs/icons"
import { NoResultsBoundary } from "@modules/store/components/no-results-boundary"
import { NoResults } from "@modules/store/components/no-results"
import { getRegion } from "app/actions"
import { headers } from "next/headers"

const InfiniteHits = () => {
  // const nextHeaders = headers()
  // const countryCode = nextHeaders.get("next-url")?.split("/")[1] || ""
  // const region = await getRegion(countryCode)

  // if (!region) {
  //   return null
  // }



  const { hits, isLastPage, showMore } = useInfiniteHits()
  const { items, canRefine, refine } = useCurrentRefinements({
    includedAttributes: [
      "collection",
      "category.lvl0",
      "category.lvl1",
      "size",
      "color",
      "material",
      "tag",
      "type",
      "price",
    ],
  })

  return (
    <div className="content-container w-full">
      <div className="flex justify-between  pb-2">
        <div className="text-large-semi">
          <button
            className="flex text-sm"
            // onClick={toggle}
          >
            <Adjustments strokeWidth={"1"} />
            <span className="ps-2">Tutti i filtri</span>
          </button>
        </div>
        <div className="flex justify-end align-middle text-large-semi">
          <SortBy
            items={[
              { label: "In primo piano", value: "products" },
              { label: "Prezzo: da Basso a Alto", value: "products:price:asc" },
              {
                label: "Prezzo: da Alto a Basso",
                value: "products:price:desc",
              },
            ]}
          />
        </div>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
        <NoResultsBoundary fallback={<NoResults />}>
          {hits.map((p: any) => (
            <li key={p.id}>
              {/* <ProductPreview productPreview={p} region={} /> */}
            </li>
          ))}
        </NoResultsBoundary>
      </ul>
    </div>
  )
}

export default InfiniteHits

"use client"

import InfiniteHits from "@modules/products/components/infinite-hits"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import { InstantSearch } from "react-instantsearch"
import MeilisearchRefinementList from "../components/meilisearch-refinement-list"

export default function Store() {
  return (
    <div>
      <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
        <div className="flex flex-col small:flex-row small:items-start py-6">
          <div className="px-2 w-60">
            {/* <MeilisearchRefinementList /> */}
          </div>
          <div className="flex-1 w-full">
            <div className="content-container w-full mb-4 px-3 text-2xl-semi">
              <h1>Store</h1>
            </div>
            <InfiniteHits />
          </div>
        </div>
      </InstantSearch>
    </div>
  )
}

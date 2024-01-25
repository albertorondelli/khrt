import InfiniteHits from "@modules/products/components/infinite-hits"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import {
  InstantSearch,
  InstantSearchSSRProvider,
  InstantSearchServerState,
} from "react-instantsearch"
import MeilisearchRefinementList from "../components/meilisearch-refinement-list"

type StoreProps = {
  serverState?: InstantSearchServerState
}

export default function Store(serverState: StoreProps) {
  return (
    <div>
      <InstantSearchSSRProvider {...serverState}>
        <InstantSearch
          indexName={SEARCH_INDEX_NAME}
          searchClient={searchClient}
        >
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
      </InstantSearchSSRProvider>
    </div>
  )
}

import { Dialog, Transition } from "@headlessui/react"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"
import Search from "@modules/common/icons/search"
import MobileHit from "@modules/search/components/mobile-hit"
import MobileHits from "@modules/search/components/mobile-hits"
import SearchBox from "@modules/search/components/search-box"
import { Fragment } from "react"
import { InstantSearch } from "react-instantsearch"

const SearchMenu = () => {
  const {
    screen: [currentScreen, setScreen],
  } = useMobileMenu()

  return (
    <InstantSearch searchClient={searchClient} indexName={SEARCH_INDEX_NAME}>
      <Transition appear show={currentScreen == "search"} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="flex flex-col flex-1 bg-white h-full">
              <div className="max-h-16 flex items-center justify-between w-full h-full border-b border-gray-200 pt-6 pb-5 px-6">
                <div className="flex-1 basis-0">
                  <div className="flex items-center gap-x-2">
                    <Search className="text-gray-500" size={20} />
                    <SearchBox />
                  </div>
                </div>
                <div className="flex justify-end ml-4">
                  <button
                    onClick={() => setScreen("main")}
                    className="text-small-semi uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="d-flex py-4 px-8">
                <MobileHits hitComponent={MobileHit} />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </InstantSearch>
  )
}

export default SearchMenu

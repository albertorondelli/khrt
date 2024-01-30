import { Dialog, Transition } from "@headlessui/react"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import { Fragment } from "react"
import ReactCountryFlag from "react-country-flag"

const CountryMenu = () => {
  const {
    close,
    screen: [screen, setScreen],
  } = useMobileMenu()

  const { setRegion } = useStore()
  const countryOptions = useCountryOptions()

  const handleSelectCountry = (regionId: string, countryCode: string) => {
    setRegion(regionId, countryCode)
    close()
  }

  return (
    <Transition appear show={screen == "country"} as={Fragment}>
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
          <div className="flex flex-col flex-1 bg-white">
            <div className="flex items-center justify-between w-full border-b border-gray-200 pt-6 pb-5 px-6">
              <div className="flex-1 basis-0">
                <button
                  className="flex items-center gap-x-2"
                  onClick={() => setScreen("main")}
                >
                  <ChevronDown className="rotate-90 text-gray-700" size={20} />
                </button>
              </div>
              <div>
                <h1 className="text-large-regular">Shipping To</h1>
              </div>
              <div className="flex-1 basis-0 flex justify-end">
                <button onClick={close}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div>
              <ul className="py-4">
                {countryOptions?.map((option) => (
                  <li key={option.country}>
                    <button
                      className="px-8 py-4 flex items-center justify-between w-full border-b border-gray-200"
                      onClick={() =>
                        handleSelectCountry(option.region, option.country)
                      }
                    >
                      <div className="flex items-center gap-x-4">
                        <ReactCountryFlag svg countryCode={option.country} />
                        <span className="text-base-regular">
                          {option.label}
                        </span>
                      </div>
                      <ChevronDown size={16} className="-rotate-90" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default CountryMenu

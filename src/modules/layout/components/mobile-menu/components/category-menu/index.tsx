import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import Link from "next/link"
import useCategories from "@lib/hooks/use-categories"

interface CategoryMenuProps {
  parentCategoryId: string
}

const CategoryMenu = ({ parentCategoryId }: CategoryMenuProps) => {
  const {
    close,
    screen: [screen, setScreen],
  } = useMobileMenu()

  const product_categories = useCategories(parentCategoryId)

  return (
    <Transition appear show={screen == "category"} as={Fragment}>
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
            <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
              <div className="flex-1 basis-0">
                <button
                  className="flex items-center gap-x-2"
                  onClick={() => setScreen("main")}
                >
                  <ChevronDown className="rotate-90 text-gray-700" size={20} />
                </button>
              </div>
              <div>
                <h1 className="text-xl-semi uppercase">
                  {product_categories?.[0]?.parent_category?.name}
                </h1>
              </div>
              <div className="flex-1 basis-0 flex justify-end">
                <button onClick={close}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
              <div className="flex flex-col flex-1 text-large-regular text-gray-900">
                <ul className="flex flex-col gap-y-2">
                  {product_categories?.map((category: any) => (
                    <li className="bg-gray-50 p-4" key={category.id}>
                      <Link href={`/categories/${category.handle}`}>
                        <button
                          className="flex items-center justify-between w-full"
                          onClick={close}
                        >
                          <span className="sr-only">Go to {category.name}</span>
                          <span>{category.name}</span>
                          <ChevronDown className="-rotate-90" />
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default CategoryMenu

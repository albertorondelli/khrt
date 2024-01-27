import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Button } from "@medusajs/ui"
import { StateType } from "@lib/hooks/use-toggle-state"

type TransitionContainerProps = {
  state: boolean
  open: () => void
  close: () => void
  children: React.ReactNode
}

const TransitionContainer = ({
  children,
  state,
  open,
  close,
}: TransitionContainerProps) => {
  return (
    <div>
      <Button onClick={open} variant="secondary" className="w-full">
        OPEN MODAL
      </Button>
      <Transition show={state} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden flex z-50"
          onClose={close}
        >
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-700 bg-opacity-75 transition-opacity backdrop-blur-sm" />
          </Transition.Child>

          {/* Dialog content */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-y-0 right-0 bg-white text-gray-900 overflow-y-auto w-full sm:w-[30rem]">
              {children}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}

export default TransitionContainer
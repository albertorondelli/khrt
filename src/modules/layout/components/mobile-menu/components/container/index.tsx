"use client"

import { Popover, Transition } from "@headlessui/react"
import { Fragment } from "react"

type ContainerProps = {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base">
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  className="fixed inset-0 overflow-hidden transition-transform duration-300"
                  style={{
                    transformOrigin: "top right",
                  }}
                >
                  {children}
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default Container

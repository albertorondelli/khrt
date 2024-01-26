"use-client"

import { Button } from "@medusajs/ui"
import { ChevronDown, XMark } from "@medusajs/icons"
import { Dispatch, SetStateAction } from "react"
import Category from "../category"
import Collection from "../collection"

const filterableAttributes = [
  { id: "0", title: "Collections", key: "collection" },
  { id: "1", title: "Categories", key: "category" },
  { id: "2", title: "Colors", key: "color" },
  { id: "3", title: "Sizes", key: "size" },
  { id: "4", title: "Material", key: "material" },
  { id: "5", title: "Tags", key: "tag" },
  { id: "6", title: "Types", key: "type" },
]

type MainViewProps = {
  attribute: string
  setAttribute: Dispatch<SetStateAction<any>>
  close: Dispatch<SetStateAction<any>>
}
const MainView: React.FC<MainViewProps> = ({
  attribute,
  setAttribute,
  close,
}) => {
  return (
    <div
      className={`flex flex-col h-full ${
        attribute === "" ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
        <h1 className="text-large-semi flex-1 text-center">Ordina e Filtra</h1>
        <button onClick={close}>
          <XMark />
        </button>
      </div>
      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-regular text-gray-900">
          <ul className="flex flex-col gap-y-2">
            {filterableAttributes.map((filter) => (
              <li key={filter.id}>
                <button
                  className="flex items-center justify-between w-full bg-gray-50 p-4"
                  onClick={() => {
                    setAttribute(filter.key)
                  }}
                >
                  <span className="sr-only">{filter.title} products</span>
                  <span>{filter.title}</span>
                  <ChevronDown className="-rotate-90" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex justify-center items-end mt-auto p-4">
        <div className="flex items-center justify-center gap-4 w-full">
          <Button variant="secondary" className="w-full" size="large">
            Elimina tutto
          </Button>
          <Button onClick={close} className="w-full" size="large">
            Conferma
          </Button>
        </div>
      </div>
    </div>
  )
}

type DetailViewProps = {
  attribute: string
  setAttribute: Dispatch<SetStateAction<any>>
  close: Dispatch<SetStateAction<any>>
}
export const DetailView: React.FC<DetailViewProps> = ({
  attribute,
  setAttribute,
  close,
}) => {
  return (
    <div
      className={`flex flex-col min-h-full ${
        attribute === "" ? "hidden" : "block"
      }`}
    >
      <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={() => setAttribute("")}
          >
            <ChevronDown className="rotate-90 text-gray-700" />
          </button>
        </div>
        <div>
          <h1 className="text-large-semi">{attribute}</h1>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <XMark />
          </button>
        </div>
      </div>
      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <ul className="flex flex-col flex-1 text-large-regular text-gray-900">
          <li className={attribute === "category" ? "block" : "hidden"}>
            <Category />
          </li>
          <li className={attribute === "collection" ? "block" : "hidden"}>
            <Collection />
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-end p-4">
        <div className="flex items-center justify-center gap-4 w-full">
          <Button variant="secondary" className="w-full" size="large">
            Rimuovi i filtri
          </Button>
          <Button onClick={close} className="w-full" size="large">
            Conferma
          </Button>
        </div>
      </div>
    </div>
  )
}

type MenuProps = {
  attribute: string
  setAttribute: Dispatch<SetStateAction<any>>
}

export default function Menu({ attribute, setAttribute }: MenuProps) {
  return (
    <div className="h-full">
      <MainView
        setAttribute={setAttribute}
        close={close}
        attribute={attribute}
      />
      <DetailView
        attribute={attribute}
        setAttribute={setAttribute}
        close={close}
      />
    </div>
  )
}

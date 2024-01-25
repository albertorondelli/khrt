"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Button } from "@medusajs/ui"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import {
  HierarchicalMenu,
  RefinementList,
  useClearRefinements,
  useHierarchicalMenu,
  useInstantSearch,
  useRange,
  useRefinementList,
} from "react-instantsearch"
import { RangeBoundaries } from "instantsearch.js/es/connectors/range/connectRange"
import { ClearFilters } from "../clear-filters"
import { formatNumber } from "../results-number-mobile"
import { XMark, ChevronDown } from "@medusajs/icons"

export function Panel({
  children,
  header,
  footer,
}: {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="ais-Panel">
      {header && <div className="ais-Panel-header">{header}</div>}
      <div className="ais-Panel-body">{children}</div>
      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  )
}

interface PriceSliderProps {
  attribute: string
}

const PriceSlider: React.FC<PriceSliderProps> = ({ attribute }) => {
  const { range, start, refine, canRefine } = useRange({
    attribute,
  })
  const { min, max } = range
  const [value, setValue] = useState({ start: min, end: max })

  const from = Math.max(
    min ?? 0,
    Number.isFinite(start[0]) && start[0] !== undefined ? start[0] : min ?? 0
  )

  const to = Math.min(
    max ?? 0,
    Number.isFinite(start[1]) && start[1] !== undefined ? start[1] : max ?? 0
  )

  useEffect(() => {
    setValue({ start: from, end: to })
  }, [from, to])

  const handleSliderChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      // setValue(newValue)
      refine([newValue[0], newValue[1]] as RangeBoundaries)
    } else {
      // Handle single number case if needed
      // setValue([newValue, newValue]) // For example, set both min and max to the same value
      refine([newValue, newValue] as RangeBoundaries)
    }
  }

  return (
    <div className="p-4">
      <h2>Range Prezzo</h2>
      {canRefine && (
        <div className="mt-4">
          <Slider
            range
            min={min}
            max={max}
            allowCross={false}
            value={[value.start || 0, value.end || 0]}
            onChange={handleSliderChange}
          />
          <div className="flex justify-between">
            <span>{value.start} €</span>
            <span>{value.end} €</span>
          </div>
        </div>
      )}
    </div>
  )
}

type MainMenuProps = {
  clearRefine: ReturnType<typeof useClearRefinements>["refine"]
  attribute: string
  setAttribute: Dispatch<SetStateAction<any>>
  close: Dispatch<SetStateAction<any>>
}
const MainMenu: React.FC<MainMenuProps> = ({
  clearRefine,
  attribute,
  setAttribute,
  close,
}) => {
  const {
    results: { nbHits },
  } = useInstantSearch()

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
            <li>
              <PriceSlider attribute="price" />
            </li>
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
          <Button variant="secondary" onClick={() => clearRefine()}>
            Elimina tutto
          </Button>
          <Button onClick={close}>Conferma ({formatNumber(nbHits)})</Button>
        </div>
      </div>
    </div>
  )
}

const filterableAttributes = [
  { id: "0", title: "Collections", key: "collection" },
  { id: "1", title: "Categories", key: "categorie" },
  { id: "2", title: "Colors", key: "color" },
  { id: "3", title: "Sizes", key: "size" },
  { id: "4", title: "Material", key: "material" },
  { id: "5", title: "Tags", key: "tag" },
  { id: "6", title: "Types", key: "type" },
]

type FilterMenuProps = {
  clearRefine: ReturnType<typeof useClearRefinements>["refine"]
  attribute: string
  setAttribute: Dispatch<SetStateAction<any>>
  close: Dispatch<SetStateAction<any>>
}
const FilterMenu: React.FC<FilterMenuProps> = ({
  clearRefine,
  attribute,
  setAttribute,
  close,
}) => {
  const {
    results: { nbHits },
  } = useInstantSearch()

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
          <li className={attribute === "collection" ? "block" : "hidden"}>
            <RefinementList attribute={"collection"} />
          </li>
          <li className={attribute === "category" ? "block" : "hidden"}>
            <HierarchicalMenu attributes={["category.lvl0", "category.lvl1"]} />
          </li>
          <li className={attribute === "size" ? "block" : "hidden"}>
            <RefinementList attribute={"size"} />
          </li>
          <li className={attribute === "color" ? "block" : "hidden"}>
            <RefinementList attribute={"color"} />
          </li>
          <li className={attribute === "material" ? "block" : "hidden"}>
            <RefinementList attribute={"material"} />
          </li>
          <li className={attribute === "tag" ? "block" : "hidden"}>
            <RefinementList attribute={"tag"} />
          </li>
          <li className={attribute === "type" ? "block" : "hidden"}>
            <RefinementList attribute={"type"} />
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-end p-4">
        <div className="flex items-center justify-center gap-4 w-full">
          <Button variant="secondary" onClick={() => clearRefine()}>
            Rimuovi i filtri
          </Button>
          <Button onClick={close}>Conferma ({formatNumber(nbHits)})</Button>
        </div>
      </div>
    </div>
  )
}

// type FiltersProps = {
//   attribute: string
//   setAttribute: Dispatch<SetStateAction<any>>
// }

export function MobileFilters() {
  const [attribute, setAttribute] = useState("")
  const { refine: clearRefine } = useClearRefinements()

  const { uiState, setUiState } = useInstantSearch()
  const uiStateRef = useRef(uiState)

  // Keep up to date uiState in a reference
  useEffect(() => {
    uiStateRef.current = uiState
  }, [uiState])

  // Apply latest uiState to InstantSearch as the component is unmounted
  useEffect(() => {
    return () => {
      setTimeout(() => setUiState(uiStateRef.current))
    }
  }, [setUiState])

  return (
    <div className="h-full">
      <MainMenu
        setAttribute={setAttribute}
        close={close}
        attribute={attribute}
        clearRefine={clearRefine}
      />
      <FilterMenu
        attribute={attribute}
        setAttribute={setAttribute}
        close={close}
        clearRefine={clearRefine}
      />
    </div>
  )
}

export function DesktopFilters() {
  return (
    <>
      <div className="flex items-center justify-end min-h-20">
        <div className="flex items-center" data-layout="desktop">
          <ClearFilters />
        </div>
      </div>
      <PriceSlider attribute="price" />
      <div className="px-3 pt-5">
        <Panel header="Collections">
          <RefinementList attribute={"collection"} />
        </Panel>

        <Panel header="Categories">
          <HierarchicalMenu attributes={["category.lvl0", "category.lvl1"]} />
        </Panel>
        <Panel header="Sizes">
          <RefinementList attribute={"size"} />
        </Panel>
        <Panel header="Colors">
          <RefinementList attribute={"color"} />
        </Panel>
        <Panel header="Tags">
          <RefinementList attribute={"tag"} />
        </Panel>
      </div>
    </>
  )
}

export function VirtualFilters() {
  useRefinementList({ attribute: "collection" })
  useHierarchicalMenu({ attributes: ["category.lvl0", "category.lvl1"] })
  useRefinementList({ attribute: "size" })
  useRefinementList({ attribute: "color" })
  useRefinementList({ attribute: "material" })
  useRefinementList({ attribute: "tag" })
  useRefinementList({ attribute: "type" })
  useRange({ attribute: "price" })

  return null
}

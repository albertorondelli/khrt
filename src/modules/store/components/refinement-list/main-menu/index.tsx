"use-client"

import Button from "@modules/common/components/custom-button"
import { ChevronDown, XMark } from "@medusajs/icons"

// TODO: Uncomment this code to enable more filters
const filterableAttributes = [
  { id: "0", title: "Sort by", key: "sortBy" },
  // { id: "1", title: "Colors", key: "color" },
  // { id: "2", title: "Sizes", key: "size" },
  // { id: "3", title: "Tags", key: "tags" },
]

type MainMenuProps = {
  handleMenu: (
    screen: string,
    attribute?: "sortBy" | "color" | "size" | "tags" | string
  ) => void
  close: () => void
}

const MainMenu: React.FC<MainMenuProps> = ({ close, handleMenu }) => {
  const handleRemove = () => {
    // TODO: Remove all the filters (colors and sizes)
  }

  return (
    <div className="flex flex-col flex-1 text-ui-fg-base">
      <div className="flex items-center justify-between w-full border-b border-ui-border-base py-4 px-6">
        <h1 className="text-xl-semi flex-1 text-center uppercase">
          Ordina e Filtra
        </h1>
        <button onClick={close}>
          <XMark />
        </button>
      </div>
      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-regular text-ui-fg-base">
          <ul className="flex flex-col gap-y-2">
            {filterableAttributes.map((filter) => (
              <li key={filter.id}>
                <button
                  className="flex items-center justify-between w-full p-4 rounded-sm bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover text-large-semi text-ui-fg-base"
                  onClick={() => {
                    handleMenu("secondary", filter.key)
                  }}
                >
                  <span className="sr-only">{filter.title} products</span>
                  <span>{filter.key}</span>
                  <ChevronDown className="-rotate-90" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex justify-center items-end mt-auto p-4">
        <div className="flex items-center justify-center gap-4 w-full py-5">
          <Button
            variant="secondary"
            onClick={handleRemove}
            className="w-full"
            size="large"
          >
            Rimuovi i filtri
          </Button>
          <Button
            variant="secondary"
            onClick={close}
            className="w-full"
            size="large"
          >
            Chiudi
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MainMenu

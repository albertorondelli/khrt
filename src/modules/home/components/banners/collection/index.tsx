import { Heading } from "@medusajs/ui"

interface CollectionsBannersProps {
  collections: any
}

export default async function CollectionsBanners({
  collections,
}: CollectionsBannersProps) {
  return (
    <div className="h-[50vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      {/* <Image
    src={manCategory}
    alt="Hero image"
    fill
    style={{
      objectFit: "cover",
    }}
  /> */}
      <div className="absolute inset-0 z-10 flex flex-col  small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-2xl leading-10 text-ui-fg-base font-normal"
          >
            collection-title
          </Heading>
          <Heading
            level="h2"
            className="text-xl leading-10 text-ui-fg-subtle font-normal"
          >
            collection-subtitle
          </Heading>
        </span>
      </div>
    </div>
  )
}

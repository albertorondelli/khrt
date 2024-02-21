import { Heading } from "@medusajs/ui"
import backgroundImage from "../../../../../public/backgroundImage.webp"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border border-ui-border-base relative bg-ui-bg-subtle">
      <Image
        src={backgroundImage}
        alt="Hero image"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            KHRT STORE
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            Welcome to our new online shop !
          </Heading>
        </span>
      </div>
    </div>
  )
}

export default Hero

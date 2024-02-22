import { Button, Heading } from "@medusajs/ui"
import backgroundImage from "../../../../../public/backgroundImage.webp"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-dvh w-full border border-ui-border-base relative">
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
          <Heading level="h1" className="text-3xl text-ui-fg-on-color">
            KHRT STORE
          </Heading>
          <Heading
            level="h2"
            className="text-2xl text-ui-fg-on-color font-normal"
          >
            Welcome to our new online shop !
          </Heading>
        </span>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col justify-center items-baseline small:p-32 gap-6">
        <LocalizedClientLink href="/store" passHref>
          <Button variant="secondary" size="large">
            Sfoglia il catalogo
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero

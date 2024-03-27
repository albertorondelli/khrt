import { Heading } from "@medusajs/ui"
import Button from "@modules/common/components/custom-button"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { createTranslation } from "@i18n/server"

import heroImage from "@public/images/hero.webp"

const Hero = async () => {
  const { t } = await createTranslation("common")

  return (
    <LocalizedClientLink href={`/store`} passHref>
      <div className="relative h-[94vh] w-full border border-ui-border-base">
        <Image
          src={heroImage}
          alt="Hero KHRT"
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
              {t("greeting")}
            </Heading>
          </span>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col justify-center items-baseline small:p-32 gap-6">
          <Button variant="secondary" size="large">
            {t("browse-all")}
          </Button>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default Hero

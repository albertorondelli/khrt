import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CollectionsBanners from "@modules/home/components/banners/collection"
import CategoriesBanners from "@modules/home/components/banners/category"
import Carousel from "@modules/home/components/carousel"
import { Suspense } from "react"
import SkeletonBanner from "@modules/skeletons/components/skeleton-banner"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import SkeletonFeaturedProducts from "@modules/skeletons/templates/skeleton-featured-products"
import { createTranslation } from "@i18n/server"

export const metadata: Metadata = {
  title: "KHRT | Moda Online",
  description: "Scopri le ultime tendenze moda uomo donna con KHRT.",
}

export default async function Home({
  params: { countryCode },
}: Readonly<{
  params: { countryCode: string }
}>) {
  return (
    <div className="bg-ui-bg-base">
      <div className="md:content-container">
        {/* // TODO: Make this a component */}
        <div className="flex w-full justify-center items-center h-10 bg-ui-bg-accent">
          <span className="text-base-regular"></span>
        </div>
        
        <div className="mb-12 small:mb-24">
          <Hero />
        </div>

        <div className="my-12 small:my-24">
          <Suspense fallback={<SkeletonBanner size="square" />}>
            <CategoriesBanners size="square" />
          </Suspense>
        </div>

        <div className="my-12 small:my-24">
          <Suspense fallback={<SkeletonBanner size="square" />}>
            <CollectionsBanners wButton={false} size="square" />
          </Suspense>
        </div>

        <div className="my-12 small:my-24">
          <Carousel size="horizontal" />
        </div>

        <div className="content-container my-12 small:my-24">
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ul className="flex flex-col gap-x-6">
              <FeaturedProducts countryCode={countryCode} />
            </ul>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

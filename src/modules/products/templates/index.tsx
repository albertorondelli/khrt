import { Customer, Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { isWishlisted } from "@modules/wishlist/actions"
import { getWishlist } from "@lib/data"

type ProductTemplateProps = {
  customer: Omit<Customer, "password_hash"> | null
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  customer,
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }
  const customerId = customer?.id || ""
  const onWishlist = await isWishlisted(customerId, product.id)
  
  return (
    <div className="bg-ui-bg-base">
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
        <div className="flex flex-col small:hidden w-full pb-8 gap-y-6">
          <ProductInfo
            customer={customer}
            onWishlist={onWishlist}
            product={product}
          />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="flex flex-col small:sticky small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <div className="hidden small:flex flex-col">
            <ProductInfo
              customer={customer}
              onWishlist={onWishlist}
              product={product}
            />
          </div>
          <ProductOnboardingCta />
          <Suspense
            fallback={<ProductActions product={product} region={region} />}
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          <ProductTabs product={product} />
        </div>
      </div>

      <div className="content-container py-16 small:py-32 bg-ui-bg-base">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate

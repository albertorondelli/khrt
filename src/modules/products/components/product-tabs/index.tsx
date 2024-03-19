"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { useTranslation } from "@i18n/client"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const { t } = useTranslation("product")

  const tabs = [
    {
      label: "Product Information",
      key: "product-information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      key: "shipping-returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={t(tab.key)}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const { t } = useTranslation("product")

  return (
    <div className="text-base-regular py-8 text-ui-fg-base">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t("material")}</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("country-origin")}</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("type")}</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t("weight")}</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("dimensions")}</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {product.tags?.length ? (
        <div>
          <span className="font-semibold">{t("tags")}</span>
        </div>
      ) : null}
    </div>
  )
}

const ShippingInfoTab = () => {
  const {t} = useTranslation("product")
  
  return (
    <div className="text-base-regular py-8 text-ui-fg-base">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">{t("fast-delivery")}</span>
            <p className="max-w-sm">{t("fast-delivery-message")}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">{t("simple-exchanges")}</span>
            <p className="max-w-sm">{t("simple-exchanges-message")}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">{t("easy-returns")}</span>
            <p className="max-w-sm">{t("easy-returns-message")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs

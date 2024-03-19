"use client"

import { ProductCollection } from "@medusajs/medusa"
import Accordion from "@modules/products/components/product-tabs/accordion"
import { ProductCategoryWithChildren } from "types/global"
import {
  CategoriesTab,
  CollectionsTab,
  CustomerServicesTab,
} from "./components"
import { useTranslation } from "@i18n/client"

interface FooterAccordionProps {
  categories: ProductCategoryWithChildren[]
  collections: ProductCollection[]
}

export const FooterAccordion = ({
  categories,
  collections,
}: FooterAccordionProps) => {
  const { t } = useTranslation("footer")

  const tabs = [
    {
      label: "Categories",
      key: "categories",
      component: <CategoriesTab categories={categories} />,
    },
    {
      label: "Collections",
      key: "collections",
      component: <CollectionsTab collections={collections} />,
    },
    {
      label: "Customer Services",
      key: "customer-service",
      component: <CustomerServicesTab />,
    },
  ]
  return (
    <Accordion type="single" collapsible>
      {tabs.map((tab, i) => (
        <Accordion.Item
          key={i}
          title={t(tab.key)}
          headingSize="large"
          value={tab.label}
        >
          {tab.component}
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

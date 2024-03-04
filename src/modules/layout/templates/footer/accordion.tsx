"use client"

import { ProductCollection } from "@medusajs/medusa"
import Accordion from "@modules/products/components/product-tabs/accordion"
import { ProductCategoryWithChildren } from "types/global"
import {
  CategoriesTab,
  CollectionsTab,
  CustomerServicesTab,
} from "./components"

interface FooterAccordionProps {
  categories: ProductCategoryWithChildren[]
  collections: ProductCollection[]
}

export const FooterAccordion = ({
  categories,
  collections,
}: FooterAccordionProps) => {
  const tabs = [
    {
      label: "Categories",
      component: <CategoriesTab categories={categories} />,
    },
    {
      label: "Collections",
      component: <CollectionsTab collections={collections} />,
    },
    {
      label: "Customer Services",
      component: <CustomerServicesTab />,
    },
  ]
  return (
    <Accordion type="single" collapsible>
      {tabs.map((tab, i) => (
        <Accordion.Item
          key={i}
          title={tab.label}
          headingSize="large"
          value={tab.label}
        >
          {tab.component}
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
